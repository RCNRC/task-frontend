import React from "react";
import "./PlansLibraryStyle.css"
import * as d3 from "d3";
import {add_object_on_canvas} from "./CanvasField";

let default_plans_library = [
    [["my first office", "1 floor"], ["circle", "60", "60", "30"], ["circle", "10", "10", "8"], ["polyline", "10 40 30 20 0 90 80 67", "4", "black", "transparent"], ["circle", "10", "10", "25"], ["polygon", "10 16 5 10 7 18 6 19 5 25 50 15 35 25 40 90 30 18 45 18", "3", "black", "black"]],
    [["my first office", "2 floor"], ["rect", "80", "60", "20", "40"], ["circle", "10", "10", "25"], ["line", "10", "40", "30", "20", "3", "black", "black"], ["path", "M 20 23 Q 40 205, 50 230 T 90 230", "3", "black", "black"]],
];

let plans_num=0;
let first_open:boolean = true;

function initialize_default_plans(){
    let default_plans = default_plans_library;
    default_plans.forEach((plan)=>{add_plan_to_library(plan);});
}

export function add_plan_to_library(plan:any/*: string[][]*/){
    let plan_name = plan[0][0];
    let el = d3.select(".plans_library");
    let par = el.append("p").attr("class", `library_p_${plans_num}`);
    let p = par.append("p");
    p.append("text").text(`Название плана: ${plan_name}`);
    let div = par.append("div").attr("class", `objects_${plans_num}_body`);
    let svg = div.append("svg").attr("class", `object_${plans_num}_svg`).style("overflow", "scroll").style("background-color", "white");
    for(let j:number=1; j<plan.length; j++){
        if(plan[j][0]==="rect")
            svg.append(plan[j][0]).attr("x", parseFloat(plan[j][1])).attr("y", parseFloat(plan[j][2])).attr("width", parseFloat(plan[j][3])).attr("height", parseFloat(plan[j][4]));
        else if(plan[j][0]==="circle")
            svg.append(plan[j][0]).attr("cx", parseFloat(plan[j][1])).attr("cy", parseFloat(plan[j][2])).attr("r", parseFloat(plan[j][3]));
        else if(plan[j][0]==="ellipse")
            svg.append(plan[j][0]).attr("cx", parseFloat(plan[j][1])).attr("cy", parseFloat(plan[j][2])).attr("rx", parseFloat(plan[j][3])).attr("ry", parseFloat(plan[j][4]));
        else if(plan[j][0]==="line")
            svg.append(plan[j][0]).attr("x1", parseFloat(plan[j][1])).attr("x2", parseFloat(plan[j][2])).attr("y1", parseFloat(plan[j][3])).attr("y2", parseFloat(plan[j][4])).attr("stroke-width", parseFloat(plan[j][5])).style("stroke", plan[j][6]).attr("fill", plan[j][7]);
        else if(plan[j][0]==="polyline")
            svg.append(plan[j][0]).attr("points", plan[j][1]).attr("stroke-width", parseFloat(plan[j][2])).style("stroke", plan[j][3]).attr("fill", plan[j][4]);
        else if(plan[j][0]==="polygon")
            svg.append(plan[j][0]).attr("points", plan[j][1]).attr("stroke-width", parseFloat(plan[j][2])).style("stroke", plan[j][3]).attr("fill", plan[j][4]);
        else if(plan[j][0]==="path")
            svg.append(plan[j][0]).attr("d", plan[j][1]).attr("stroke-width", parseFloat(plan[j][2])).style("stroke", plan[j][3]).attr("fill", plan[j][4]);
    }
    let divdiv = div.append("div");
    let metadata_p = divdiv.append("p");
    metadata_p.append("text").text(`Метаданные плана: ${plan[0][1]}`);
    let add_button_p = divdiv.append("p");
    let delete_button_p = divdiv.append("p");
    let add_button = add_button_p.append("button");
    add_button.append("text").text("Добавить план на канвас");
    add_button.on("mousedown", ()=>{add_object_on_canvas(plan);});
    let delete_button = delete_button_p.append("button");
    delete_button.append("text").text("Удалить план из библиотеки");
    delete_button.on("mousedown", ()=>{par.remove();});

    plans_num++;
}

export function plans_library_visualize(){
    if(first_open) {
        initialize_default_plans();
        first_open = false;
    }
    let el = d3.select(".plans_library");
    let el_oth = d3.select(".objects_library");
    if(el_oth.style("visibility")==="visible")
        el_oth.style("visibility", "hidden");
    if(el.style("visibility")==="hidden")
        el.style("visibility", "visible");
    else
        el.style("visibility", "hidden");
}

export class PlansLibrary extends React.Component{
    render() {
        return (
            <div className={"plans_library"}>
                <p>Библиотека планов</p>
            </div>
        );
    }
}