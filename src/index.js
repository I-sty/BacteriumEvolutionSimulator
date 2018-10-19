'use strict';

import Bacterium from './bacterium';
import * as d3 from 'd3';


const ITERATIONS = 200000;
const NUMBER_OF_BACTERIUMS = 500;
const CIRCLE_RADIUS = 5;
const SLEEP_BETWEEN_ITERATIONS = 150;
var STOP = false;
var numberOfIteration;
let bacteriums;

/**
 * Create the bacteriums in the gui
 */
function createBacteriums() {
    var bacteriumsData = new Array(NUMBER_OF_BACTERIUMS);

    for (let i = 0; i < bacteriumsData.length; ++i) {
        let x = Math.random() * 500;
        let y = Math.random() * 500;
        let energy = Math.random() * 50;
        bacteriumsData[i] = new Bacterium(x, y, energy);
    }

    bacteriums = d3.select("svg")
        .selectAll("g")
        .data(bacteriumsData)
        .enter()
        .append("g")
        .attr("class", "bacteriums")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mouseover", function (d) {
            d3.select(this).raise().append("text").attr("class", "playername").text(d.energy);
            d3.selectAll("g.bacteriums").filter(
                function (a) {
                    return a.energy != d.energy;
                }
            ).filter(function (d) { return d.energy > 0; }).attr("opacity", 0.1);
        })
        .on("mouseout", function (d) {
            d3.selectAll("g.bacteriums").filter(function (d) { return d.energy > 0; }).attr("opacity", 1);
            d3.selectAll("text.playername").remove();
        });

    bacteriums.append("circle").attr("r", CIRCLE_RADIUS)
        // .attr("fill", function (d) {
        //     if (d.result == "x") {
        //         return "green";
        //     } else { return "red"; }
        // })
        ;
}

/**
 * Sleep function
 * @param {"to sleep"} ms 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Moves the bacteriums in the area.
 */
async function moveBacteriums(iteration) {
    for (numberOfIteration = iteration; ((numberOfIteration <= ITERATIONS) && !STOP); ++numberOfIteration) {
        d3.select("#iterations").text(numberOfIteration + "/" + ITERATIONS);
        bacteriums.transition().attr("transform", (d) => {
            d.x = d.x + (Math.round(Math.random()) * 2 - 1) * 3;
            d.y = d.y + (Math.round(Math.random()) * 2 - 1) * 3;
            d.energy -= Math.random();
            return "translate(" + d.x + "," + d.y + ")";
        }).attr("opacity", (d) => {
            return d.energy > 0 ? 1 : 0;
        });
        bacteriums.filter((d) => {
            return d.energy <= 0;
        }).remove();
        var items = d3.selectAll("g");
        if (items.length == 0) {
            STOP = true;
        }
        await sleep(SLEEP_BETWEEN_ITERATIONS);
    }
}

function toggleMoving() {
    STOP = !STOP;
    document.getElementById("buttonStop").innerHTML = STOP == true ? "CONTINUE" : "PAUSE";
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
createBacteriums();
moveBacteriums(0);
document.getElementById("buttonStop").addEventListener("click", toggleMoving, false);

