import React from "react";
import './SignUpFormStyle.css';
import * as d3 from "d3";
import axios from "axios";

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignUpProps {
    name?: any;
    value?: any;
}

interface SignUpState {
    username: string,
    email: string,
    password: string,
    errors: {
        username: string,
        email: string,
        password: string
    }
}

export function sign_up_hide_bar() {
    let elem = d3.select(".sign_up_form");
    let elem_sign_in = d3.select(".sign_in_form");
    if (elem_sign_in.style("visibility") === "visible")
        elem_sign_in.style("visibility", "hidden")
    if (elem.style("visibility") === "hidden")
        elem.style("visibility", "visible");
    else
        elem.style("visibility", "hidden");
}

export class SignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);
        const initialState = {
            username: '',
            email: '',
            password: '',
            errors: {
                username: '',
                email: '',
                password: ''
            }
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'username':
                errors.username = value.length < 5 ? 'Username must be 5 characters long!' : '';
                break;
            case 'email':
                errors.email = Regex.test(value) ? '' : 'Email is not valid!';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be eight characters long!' : '';
                break;
            default:
                break;
        }
        this.setState(Object.assign(this.state, {errors, [name]: value}));
        console.log(this.state.errors);
    }
    post_request = (username: string, email: string, password: string) => { // https://axios-http.com/docs/post_example
        console.log(`Testing POST: username=${username}, email=${email}, password=${password}`);
        axios({
            url: '', // если url = "/user", то это будет запрос самому себе.
            method: 'post',
            data: {
                username: username,
                email: email,
                password: password
            },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // Если проблемы с корсой или запросами, то зачекай это видео: https://www.youtube.com/watch?v=VY8thJoSw9E
    // https://axios-http.com/docs/example
    handleSubmit = (event: any) => {
        event.preventDefault();
        let validity = true;
        Object.values(this.state.errors).forEach(
            (val) => val.length > 0 && (validity = false)
        );
        if (validity) {
            this.post_request(this.state.username, this.state.email, this.state.password);
            console.log("Registering can be done");
        } else {
            console.log("You cannot be registered!!!")
        }
    }

    render() {
        const {errors} = this.state
        return (
            <form onSubmit={this.handleSubmit} noValidate className={"sign_up_form"}>Регистрация
                <p>
                    <div className='fullName'>
                        <label htmlFor="username">Никнейм</label>
                        <input type='text' name='username' onChange={this.handleChange}/>
                        {errors.username.length > 0 && <span style={{color: "red"}}>{errors.username}</span>}
                    </div>
                </p>
                <p>
                    <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={this.handleChange}/>{errors.email.length > 0 &&
                        <span style={{color: "red"}}>{errors.email}</span>}
                    </div>
                </p>
                <p>
                    <div className='password'>
                        <label htmlFor="password">Пароль</label>
                        <input type='password' name='password' onChange={this.handleChange}/>
                        {errors.password.length > 0 && <span style={{color: "red"}}>{errors.password}</span>}
                    </div>
                </p>
                <p>
                    <div className='submit'>
                        <button>Зарегистрироваться</button>
                    </div>
                </p>
            </form>
        );
    }
}



