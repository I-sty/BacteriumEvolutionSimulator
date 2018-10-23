import * as d3 from "d3";
import Bacterium from "../data/bacterium";
import { NUMBER_OF_ROWS, NUMBER_OF_COLOUMNS } from "../view/gridLayout";
import Food from "../data/food";

("use strict");

const ITERATIONS = 200;
const NUMBER_OF_BACTERIUMS = 35;
const CIRCLE_RADIUS = 7;
const SLEEP_BETWEEN_ITERATIONS = 350;
const NUMBER_OF_FOOD_IN_ITERATIONS = 10;

var scaleEnergy = d3
    .scaleLinear()
    .domain([0, 1])
    .range([50, 100]);

var bacteriums;
var foods;
var STOP = false;
var numberOfIteration;
var DIRECTIONS = ["N", "S", "E", "W", "NE", "SE", "SW", "NW"];
var triangle = d3
    .symbol()
    .type(d3.symbolTriangle)
    .size(30);

/**
 * Create the bacteriums in the gui
 */
export function createBacteriums() {
    var bacteriumsData = new Array(NUMBER_OF_BACTERIUMS);
    for (let i = 0; i < bacteriumsData.length; ++i) {
        let x = scaleHorizontally(toFixed(Math.random() * NUMBER_OF_ROWS, 0));
        let y = scaleVertically(toFixed(Math.random() * NUMBER_OF_COLOUMNS, 0));
        let energy = scaleEnergy(Math.random());
        bacteriumsData[i] = new Bacterium(x, y, energy);
    }

    // Define the div for the tooltip
    var div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    bacteriums = d3
        .select("svg")
        .selectAll("g.bacteriums")
        .data(bacteriumsData)
        .enter()
        .append("g")
        .attr("class", "bacteriums")
        .attr("transform", d => {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mouseover", d => {
            div.transition()
                .duration(200)
                .style("opacity", 0.9);
            div.html(toFixed(d.energy, 5))
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY - 28 + "px");
            d3.selectAll("g.bacteriums")
                .filter(a => {
                    return a.energy != d.energy;
                })
                .filter(d => {
                    return d.energy > 0;
                })
                .attr("opacity", 0.1);
        })
        .on("mouseout", d => {
            d3.selectAll("g.bacteriums")
                .filter(d => {
                    return d.energy > 0;
                })
                .attr("opacity", d => {
                    return d.energy / 100;
                });
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    bacteriums
        .append("circle")
        .attr("r", CIRCLE_RADIUS)
        .attr("fill", "#eeeeee");
}

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
 * Sleep function
 * @param {"to sleep"} ms
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveBacteriums() {
    d3.select("#iterations").text(numberOfIteration + "/" + ITERATIONS);
    bacteriums
        .transition()
        .attr("transform", d => {
            switch (DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]) {
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
            return d.energy / 100;
        });
    bacteriums
        .filter(d => {
            return d.energy <= 0;
        })
        .remove();
}

async function addFood() {
    var foodArray = new Array(NUMBER_OF_FOOD_IN_ITERATIONS);
    for (var i = 0; i < NUMBER_OF_FOOD_IN_ITERATIONS; ++i) {
        let x = scaleHorizontally(toFixed(Math.random() * NUMBER_OF_ROWS, 0));
        let y = scaleVertically(toFixed(Math.random() * NUMBER_OF_COLOUMNS, 0));
        let energy = scaleEnergy(Math.random());
        foodArray[i] = new Food(x, y, energy);
    }
    foods = d3
        .select("svg")
        .selectAll("g.foods")
        .data(foodArray)
        .enter()
        .append("g")
        .attr("class", "foods")
        .attr("transform", d => {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mouseover", d => {
            div.transition()
                .duration(200)
                .style("opacity", 0.9);
            div.html(toFixed(d.energy, 5))
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY - 28 + "px");
            d3.selectAll("g.foods")
                .filter(a => {
                    return a.energy != d.energy;
                })
                .filter(d => {
                    return d.energy > 0;
                })
                .attr("opacity", 0.1);
        })
        .on("mouseout", d => {
            d3.selectAll("g.foods")
                .filter(d => {
                    return d.energy > 0;
                })
                .attr("opacity", d => {
                    return d.energy / 100;
                });
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    foods
        .append("path")
        .attr("d", triangle)
        .attr("fill", "#eeeeee");
}

export function toggleMoving() {
    STOP = !STOP;
    document.getElementById("buttonStop").innerHTML =
        STOP == true ? "CONTINUE" : "PAUSE";
    if (STOP == true) {
        //stopMoving();
    } else {
        doIterations(numberOfIteration);
    }
}

/**
 * Moves the bacteriums in the area.
 */
export async function doIterations(iteration) {
    for (
        numberOfIteration = iteration;
        numberOfIteration <= ITERATIONS && !STOP;
        ++numberOfIteration
    ) {
        moveBacteriums();
        addFood();
        var items = d3.selectAll("g");
        if (items.length == 0) {
            STOP = true;
        }
        await sleep(SLEEP_BETWEEN_ITERATIONS);
    }
}
