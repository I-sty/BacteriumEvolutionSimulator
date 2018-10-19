import Bacterium from './bacterium'
import * as d3 from 'd3'

var numberOfBactieriums = 40;
var circleRadius = 5;
var bacteriumsData = new Array(numberOfBactieriums);

console.log("elso log")

for (let i = 0; i < bacteriumsData.length; ++i) {
    let x = Math.random() * 500;
    let y = Math.random() * 500;
    let energy = Math.random() * 25;
    console.log(energy)
    bacteriumsData[i] = new Bacterium(x, y, energy);
}

var bacteriums = d3.select("svg")
    .selectAll("g")
    .data(bacteriumsData)
    .enter()
    .append("g")
    .attr("class", "bacteriums")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    })

bacteriums.append("circle").attr("r", circleRadius);

