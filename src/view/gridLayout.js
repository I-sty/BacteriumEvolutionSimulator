"use strict";

import * as d3 from "d3";

export var NUMBER_OF_ROWS = 49;
export var NUMBER_OF_COLOUMNS = 49;
export var CANVAS_WIDTH = 1000;
export var CANVAS_HEIGHT = 1000;

// set the dimensions and margins of the graph
var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = CANVAS_WIDTH - margin.left - margin.right,
    height = CANVAS_HEIGHT - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// gridlines in x axis function
function make_x_gridlines() {
    return d3.axisBottom(x).ticks(NUMBER_OF_ROWS);
}

// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(y).ticks(NUMBER_OF_COLOUMNS);
}

export function createGridlines(canvas) {
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = canvas
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the X gridlines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(
            make_x_gridlines()
                .tickSize(-height)
                .tickFormat("")
        );

    // add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .call(
            make_y_gridlines()
                .tickSize(-width)
                .tickFormat("")
        );
}
