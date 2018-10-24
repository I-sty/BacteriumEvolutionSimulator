import Item from "./genericObject";

("use strict");
export default class Food extends Item {
    constructor(x, y, energy, xData, yData) {
        super(x, y, energy, xData, yData);
    }
}
