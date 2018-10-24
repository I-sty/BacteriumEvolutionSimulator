"use strict";

export default class Item {
    constructor(x, y, energy, xBE, yBE) {
        this.xAxisPosition = x;
        this.yAxisPosition = y;
        this.xBackendPosition = xBE;
        this.yBackendPosition = yBE;
        this.energy = energy;
        this.age = 0;
        this.id = uuidv4();
    }
}

/**
 * Creates random numbers that look like GUIDs
 */
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
