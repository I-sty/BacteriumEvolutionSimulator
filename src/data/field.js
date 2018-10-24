("use strict");

export default class Field {
    constructor() {
        this.bacteriums = new Array();
        this.foods = new Array();
    }

    addBacterium(bacterium) {
        this.bacteriums.push(bacterium);
        this.bacteriums.sort((a, b) => {
            return a.energy - b.energy;
        });
    }

    addFood(food) {
        this.foods.push(food);
        this.foods.sort((a, b) => {
            return a.energy - b.energy;
        });
    }
}
