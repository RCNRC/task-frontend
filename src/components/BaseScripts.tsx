import './SignInFormStyle.css';
import * as d3 from "d3";

export function let_visible_to_admin() {
    let visibles = ["create_new_plan_button", "get_all_plans_button", "get_report", "buttons_for_creation_plan_field", "canvas_field", "save_plan_form"];
    visibles.forEach((class_name: string) => {
        d3.select(`.${class_name}`).style("visibility", "visible");
    });
}

export function let_visible_to_user() {
    let visibles = ["get_all_plans_button", "get_report", "canvas_field"];
    let hiddens = ["create_new_plan_button", "buttons_for_creation_plan_field", "save_plan_form"];
    visibles.forEach((class_name: string) => {
        d3.select(`.${class_name}`).style("visibility", "visible");
    });
    hiddens.forEach((class_name: string) => {
        d3.select(`.${class_name}`).style("visibility", "hidden");
    });
}

export function let_visible_to_none() {
    let hiddens = ["create_new_plan_button", "get_all_plans_button", "get_report", "buttons_for_creation_plan_field", "canvas_field", "save_plan_form"];
    hiddens.forEach((class_name: string) => {
        d3.select(`.${class_name}`).style("visibility", "hidden");
    });
}