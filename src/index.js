"use strict";

import Bacterium from "./bacterium";
import * as d3 from "d3";
import {
    createGridlines,
    CANVAS_HEIGHT,
    NUMBER_OF_COLOUMNS,
    CANVAS_WIDTH,
    NUMBER_OF_ROWS
} from "./view/gridLayout";

const ITERATIONS = 200;
const NUMBER_OF_BACTERIUMS = 150;
const CIRCLE_RADIUS = 7;
const SLEEP_BETWEEN_ITERATIONS = 750;
var STOP = false;
var numberOfIteration;
let bacteriums;

function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}

function scaleHorizontally(n) {
    return 10 + n * 21 - n * 0.145;
}

function scaleVertically(n) {
    return 10 + n * 20;
}

/**
 * Create the bacteriums in the gui
 */
function createBacteriums() {
    var bacteriumsData = new Array(NUMBER_OF_BACTERIUMS);
    // console.log("empty list");
    // console.log(bacteriumsData);
    for (let i = 0; i < bacteriumsData.length; ++i) {
        let alma = toFixed(Math.random() * NUMBER_OF_ROWS, 0);
        //console.log("alma " + alma);
        let x = scaleHorizontally(alma);
        //console.log("x " + x);

        var korte = toFixed(Math.random() * NUMBER_OF_COLOUMNS, 0);
        //console.log("korte " + korte);
        let y = scaleVertically(korte);
        //console.log("y " + y);

        let energy = Math.random() * 50;
        bacteriumsData[i] = new Bacterium(x, y, energy);
    }
    // console.log("loaded list");
    // console.log(bacteriumsData);

    // Define the div for the tooltip
    var div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    bacteriums = d3
        .select("svg")
        .selectAll("g")
        .data(bacteriumsData)
        .enter()
        .append("g")
        .attr("class", "bacteriums")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0.9);
            div.html(toFixed(d.energy, 5))
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY - 28 + "px");
            d3.selectAll("g.bacteriums")
                .filter(function(a) {
                    return a.energy != d.energy;
                })
                .filter(function(d) {
                    return d.energy > 0;
                })
                .attr("opacity", 0.1);
        })
        .on("mouseout", function(d) {
            d3.selectAll("g.bacteriums")
                .filter(function(d) {
                    return d.energy > 0;
                })
                .attr("opacity", 1);
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    bacteriums
        .append("circle")
        .attr("r", CIRCLE_RADIUS)
        .attr("fill", "#eeeeee");
    // .attr("fill", function (d) {
    //     if (d.result == "x") {
    //         return "green";
    //     } else { return "red"; }
    // })
}

/**
 * Sleep function
 * @param {"to sleep"} ms
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var DIRECTIONS = ["N", "S", "E", "W", "NE", "SE", "SW", "NW"];

/**
 * Moves the bacteriums in the area.
 */
async function moveBacteriums(iteration) {
    for (
        numberOfIteration = iteration;
        numberOfIteration <= ITERATIONS && !STOP;
        ++numberOfIteration
    ) {
        d3.select("#iterations").text(numberOfIteration + "/" + ITERATIONS);
        bacteriums
            .transition()
            .attr("transform", d => {
                switch (
                    DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
                ) {
                    case "N":
                        // north
                        d.y += 20;
                        break;
                    case "S":
                        // south
                        d.y -= 20;
                        break;
                    case "E":
                        // east
                        d.x += scaleHorizontally(1) - 10;
                        break;
                    case "W":
                        // west
                        d.x -= scaleHorizontally(1) - 10;
                        break;
                    case "NE":
                        // north-east
                        d.x += scaleHorizontally(1) - 10;
                        d.y += 20;
                        break;
                    case "SE":
                        // south-east
                        d.x -= scaleHorizontally(1) - 10;
                        d.y += 20;
                        break;
                    case "SW":
                        // south-west
                        d.x -= scaleHorizontally(1) - 10;
                        d.y -= 20;
                        break;
                    case "NW":
                        // north-west
                        d.x -= scaleHorizontally(1) - 10;
                        d.y += 20;
                        break;
                }
                d.energy -= Math.random();
                return "translate(" + d.x + "," + d.y + ")";
            })
            .attr("opacity", d => {
                return d.energy > 0 ? 1 : 0;
            });
        bacteriums
            .filter(d => {
                return d.energy <= 0;
            })
            .remove();
        var items = d3.selectAll("g");
        if (items.length == 0) {
            STOP = true;
        }
        await sleep(SLEEP_BETWEEN_ITERATIONS);
    }
}

function toggleMoving() {
    STOP = !STOP;
    document.getElementById("buttonStop").innerHTML =
        STOP == true ? "CONTINUE" : "PAUSE";
    console.log(bacteriums.data().length);
    if (STOP == true) {
        //stopMoving();
    } else {
        moveBacteriums(numberOfIteration);
    }
}

/**
 * Main entry point
 */
createGridlines(d3.select("#canvas"));
createBacteriums();
moveBacteriums(0);

// for (let i = 0; i < 50; ++i) {
//     console.log(i + " => " + scaleHorizontally(i));
// }

document
    .getElementById("buttonStop")
    .addEventListener("click", toggleMoving, false);
