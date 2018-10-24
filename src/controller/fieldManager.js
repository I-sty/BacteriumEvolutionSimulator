import Field from "../data/field";

("use strict");

export default class FieldManager {
    constructor(rows, coloumns) {
        this.mainField = new Array(coloumns);
        for (let i = 0; i < this.mainField.length; ++i) {
            this.mainField[i] = new Array(rows);
            for (let j = 0; j < this.mainField[i].length; ++j) {
                this.mainField[i][j] = new Field();
            }
        }
    }

    addNewBacteriums(bacteriums) {
        for (let i = 0; i < bacteriums.length; ++i) {
            var bacterium = bacteriums[i];
            this.mainField[parseInt(bacterium.xBackendPosition)][parseInt(bacterium.yBackendPosition)].addBacterium(
                bacterium
            );
        }
    }

    addNewFoods(foods) {
        for (let i = 0; i < foods.length; ++i) {
            var food = foods[i];
            this.mainField[parseInt(bacterium.xBackendPosition)][parseInt(bacterium.yBackendPosition)].addFood(food);
        }
    }

    /**
     * Move bacterium in the backend array.
     * @param {*} oldX
     * @param {*} oldY
     * @param {*} newX
     * @param {*} newY
     * @param {*} id
     */
    moveBacterium(oldX, oldY, newX, newY, id) {
        console.log(
            "move bacterium. Old coordinates: " + oldX + " + " + oldY + ", new coordinates: " + newX + " + " + newY
        );
        var bacteriumsList = this.mainField[oldX][oldY].bacteriums;
        for (let i = 0; i < bacteriumsList.length; ++i) {
            if (bacteriumsList[i].id == id) {
                console.log("id matched");
                var bacteriumToMove = bacteriumsList[i];
                bacteriumsList.splice(i, 1);
                this.mainField[newX][newY].addBacterium(bacteriumToMove);
                console.log("bacterium has been moved");
                break;
            }
        }
    }
}
