import Item from "./genericObject";

("use strict");

export default class Bacterium extends Item {
    constructor(xGUI, yGUI, energy, xData, yData) {
        super(xGUI, yGUI, energy, xData, yData);
    }
}
