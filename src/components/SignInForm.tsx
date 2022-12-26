import React from "react";
import './SignInFormStyle.css';
import * as d3 from "d3";
import {let_visible_to_admin, let_visible_to_user} from "./BaseScripts";
import axios from "axios";

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignInProps {
    name?: any;
    value?: any;
}

interface SignInState {
    username: string,
    email: string,
    password: string,
    errors: {
        username: string,
        email: string,
        password: string
    }
}

export function sign_in_hide_bar() {
    let elem = d3.select(".sign_in_form");
    let elem_sign_up = d3.select(".sign_up_form");
    if (elem_sign_up.style("visibility") === "visible") // Важно заметить, что для изменения css нужно менять style, не attr
        elem_sign_up.style("visibility", "hidden")
    if (elem.style("visibility") === "hidden")
        elem.style("visibility", "visible");
    else
        elem.style("visibility", "hidden");
}

export class SignIn extends React.Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
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
        this.handleChange_sign_in = this.handleChange_sign_in.bind(this);
    }

    handleChange_sign_in = (event: any) => {
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

    handleSubmit_sign_in = (event: any) => {
        event.preventDefault();
        let is_validate = true;
        Object.values(this.state.errors).forEach(
            (val) => val.length > 0 && (is_validate = false)
        );
        if (is_validate) {
            this.get_request(this.state.username, this.state.email, this.state.password);
            let_visible_to_admin();
            console.log("Registering can be done");
        } else {
            console.log("You cannot be registered!!!")
        }
    }
    get_request = (username: string, email: string, password: string) => { // https://axios-http.com/docs/post_example
        console.log(`Testing POST: username=${username}, email=${email}, password=${password}`);
        axios({
            url: '',
            method: 'get',
            params: {
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

    render() {
        const {errors} = this.state
        return (
            <form onSubmit={this.handleSubmit_sign_in} noValidate className={"sign_in_form"}>Войти
                <p>
                    <div className='fullName'>
                        <label htmlFor="fullName">Никнейм</label>
                        <input type='text' name='fullName' onChange={this.handleChange_sign_in}/>
                        {errors.username.length > 0 && <span style={{color: "red"}}>{errors.username}</span>}
                    </div>
                </p>
                <p>
                    <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={this.handleChange_sign_in}/>
                        {errors.email.length > 0 && <span style={{color: "red"}}>{errors.email}</span>}
                    </div>
                </p>
                <p>
                    <div className='password'>
                        <label htmlFor="password">Пароль</label>
                        <input type='password' name='password' onChange={this.handleChange_sign_in}/>
                        {errors.password.length > 0 && <span style={{color: "red"}}>{errors.password}</span>}
                    </div>
                </p>
                <p>
                    <div className='submit'>
                        <button>Войти</button>
                    </div>
                </p>
            </form>
        );
    }
}



