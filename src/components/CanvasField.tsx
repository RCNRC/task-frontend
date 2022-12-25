import React from "react";
import * as d3 from "d3";
import "./CanvasFieldStyle.css"
import {add_plan_to_library} from "./PlansLibrary";

let gG:any;
let width:number;
let height:number;

export function store_plan(plan_name:string, plan_metadata:string){
    let elems:any[][] = [[plan_name, plan_metadata]];
    let main_g = d3.select(".main_g_for_grid");
    main_g.select(""); // Остановился здесь. Нашёл какой элемент у меня по сути корневой, а дальше от него идут сплошные одинаковые svg>g. А уже после нужные мне круги и т.п.
// Нужно также как-нибудь понять, что нужно сделать, чтобы очистить канвас после сохранения плана.

    /*let index = myArray.indexOf(key, 0); // удаление элемента key из массива myArray
    if (index > -1)
        myArray.splice(index, 1);*/

    add_plan_to_library(elems);
}

export function add_object_on_canvas(object:any/*:string[][]*/){
    let svg = gG.append("svg").attr("class", "for_rotating");
    let g = svg.append("g").attr("cursor", "grab");
    g.attr("transform", `translate(0,0) rotate(0) scale(1)`);
    let rects:any[] = [], circles:any[] = [], ellipses:any[] = [], lines:any[] = [], polylines:any[] = [], polygons:any[] = [], paths:any[] = [];
    for(let j:number=1; j<object.length; j++){
        if(object[j][0]==="rect")
            rects.push(g.append(object[j][0]).attr("x", parseFloat(object[j][1])).attr("y", parseFloat(object[j][2])).attr("width", parseFloat(object[j][3])).attr("height", parseFloat(object[j][4])));
        else if(object[j][0]==="circle")
            circles.push(g.append(object[j][0]).attr("cx", parseFloat(object[j][1])).attr("cy", parseFloat(object[j][2])).attr("r", parseFloat(object[j][3])));
        else if(object[j][0]==="ellipse")
            ellipses.push(g.append(object[j][0]).attr("cx", parseFloat(object[j][1])).attr("cy", parseFloat(object[j][2])).attr("rx", parseFloat(object[j][3])).attr("ry", parseFloat(object[j][4])));
        else if(object[j][0]==="line")
            lines.push(g.append(object[j][0]).attr("x1", parseFloat(object[j][1])).attr("x2", parseFloat(object[j][2])).attr("y1", parseFloat(object[j][3])).attr("y2", parseFloat(object[j][4])).attr("stroke-width", parseFloat(object[j][5])).style("stroke", object[j][6]).attr("fill", object[j][7]));
        else if(object[j][0]==="polyline")
            polylines.push(g.append(object[j][0]).attr("points", object[j][1]).attr("stroke-width", parseFloat(object[j][2])).style("stroke", object[j][3]).attr("fill", object[j][4]));
        else if(object[j][0]==="polygon")
            polygons.push(g.append(object[j][0]).attr("points", object[j][1]).attr("stroke-width", parseFloat(object[j][2])).style("stroke", object[j][3]).attr("fill", object[j][4]));
        else if(object[j][0]==="path")
            paths.push(g.append(object[j][0]).attr("d", object[j][1]).attr("stroke-width", parseFloat(object[j][2])).style("stroke", object[j][3]).attr("fill", object[j][4]));
    }
    g.call(d3.drag() //SVGCircleElement - это для круга. Вот забава - для каждого типа элемента прописывать свои типы. !!!!!!!!!!!!!!!!!!!!!
        .on("start",(event, d)=>{ // event.sourceEvent.stopPropagation(); // если будут проблемы с тем, что при удалении одного не удаляется другой.
            console.log(event);
            let angle = parseFloat(g.attr("transform").split("otate(")[1].split(")")[0]);
            let translt = g.attr("transform").split("ranslate(")[1].split(")")[0];
            let scale = parseFloat(g.attr("transform").split("cale(")[1].split(")")[0]);
            console.log(scale);
            if(event.sourceEvent.altKey && event.sourceEvent.shiftKey)
                scale*=1.1;
            else if(event.sourceEvent.altKey)
                scale*=0.9;
            else if(event.sourceEvent.shiftKey)
                g.remove();
            g.attr("transform", `translate(${translt}) rotate(${angle}) scale(${scale})`);

            rects.forEach((rect)=>{
                rect.raise();
                rect.attr("cursor", "grabbing");
            });
            circles.forEach((circle)=>{
                circle.raise();
                circle.attr("cursor", "grabbing");
            });
            ellipses.forEach((ellipse)=>{
                ellipse.raise();
                ellipse.attr("cursor", "grabbing");
            });
            lines.forEach((line)=>{
                line.raise();
                line.attr("cursor", "grabbing");
            });
            polylines.forEach((polyline)=>{
                polyline.raise();
                polyline.attr("cursor", "grabbing");
            });
            polygons.forEach((polygon)=>{
                polygon.raise();
                polygon.attr("cursor", "grabbing");
            });
            paths.forEach((path)=>{
                path.raise();
                path.attr("cursor", "grabbing");
            });
        })
        .on("drag", (event, d)=>{
            let angle = parseFloat(g.attr("transform").split("tate(")[1].split(")")[0])%360;
            let scale = parseFloat(g.attr("transform").split("cale(")[1].split(")")[0]);
            if(event.sourceEvent.ctrlKey)
                angle+=1;
            g.attr("transform", `translate(${event.x},${event.y}) rotate(${angle}) scale(${scale})`);
        })
        .on("end", (event, d)=>{
            rects.forEach((rect)=>{
                rect.attr("cursor", "grab");
            });
            circles.forEach((circle)=>{
                circle.attr("cursor", "grab");
            });
            ellipses.forEach((ellipse)=>{
                ellipse.attr("cursor", "grab");
            });
            lines.forEach((line)=>{
                line.attr("cursor", "grab");
            });
            polylines.forEach((polyline)=>{
                polyline.attr("cursor", "grab");
            });
            polygons.forEach((polygon)=>{
                polygon.attr("cursor", "grab");
            });
            paths.forEach((path)=>{
                path.attr("cursor", "grab");
            });

        })
    );
}

export function add_circle_to_grid(){
    //let circle = gG.append("circle").attr("cx", 60).attr("cy", 60).attr("r", 50);
    let g = gG.append("g").attr("cursor", "grab");
    let circle = g.append("circle").attr("cx", 60).attr("cy", 60).attr("r", 50).attr("stroke", "black").attr("fill", "transparent");
    g.call(d3.drag() //SVGCircleElement - это для круга. Вот забава - для каждого типа элемента прописывать свои типы. !!!!!!!!!!!!!!!!!!!!!
        .on("start",(event, d)=>{
            circle.raise();
            circle.attr("cursor", "grabbing");
            if(event.sourceEvent.shiftKey)
                circle.remove();
        })
        .on("drag", (event, d)=>{
            circle.attr("cx", event.x).attr("cy", event.y);
        })
        .on("end", (event, d)=>{
            circle.attr("cursor", "grab");
        })
    );

    /*circle.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([0.01, 800])
        .on("zoom", (event, d)=>{
            circle.attr("transform", event.transform);
        })
    );*/
}

export function creating_grid_and_zoom() { // создаёт сетку и g для всех от него создающихся. нужно вызвать всего лишь раз.
        width = 800;
        height = 800;
        let svg = d3.select(".unreal_canvas").append("svg").attr("class", "real_canvas")
            .attr("viewBox", [0, 0, width, height]);
        let x = d3.scaleLinear().domain([-1, width + 1]).range([-1, width + 1]);
        let y = d3.scaleLinear().domain([-1, height + 1]).range([-1, height + 1]);
        let xAxis = d3.axisBottom(x).ticks(10).tickSize(height).tickPadding(8-height);
        let yAxis = d3.axisRight(y).ticks(10).tickSize(width).tickPadding(8-width);
        let gX = svg.append("g").attr("class", "axis axis--x").call(xAxis);
        let yX = svg.append("g").attr("class", "axis axis--y").call(yAxis);

        gG = svg.append("g").attr("cursor", "grab").attr("class", "main_g_for_grid");

        svg.call(d3.zoom<SVGSVGElement, unknown>()
            .extent([[0, 0], [width, height]])
            .scaleExtent([1, 800])
            .on("zoom", (event, d)=>{
                gX.call(xAxis.scale(event.transform.rescaleX(x)));
                yX.call(yAxis.scale(event.transform.rescaleY(y)));

                gG.attr("transform", event.transform);
            })
        );
}

export class CanvasField extends React.Component{
    render() { // svg имеет бесконечные поля.
        // d3.create("svg")
        return(
            <div className={"unreal_canvas"}>
            </div>
        );
    }
}