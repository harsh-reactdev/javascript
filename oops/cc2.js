'use strict';

class Car {
    constructor(make, speed) {
        this.make = make;
        this.speedUS = speed;
    }

    get speedUS() {
        return this._speedUS / 1.6;
    }

    set speedUS(speed) {
        this._speedUS = speed * 1.6;
    }

    accelerate() {
        this.speedUS += 10;
        console.log(`${this.speedUS} mph`);
    };

    brake() {
        this.speedUS -= 5;
        console.log(`${this.speedUS} mph`);
    };

}

const car3 = new Car('Ford', 45);

console.log(car3.speedUS);
car3.speedUS = 60;
console.log(car3);
console.log(car3.speedUS);

car3.accelerate();
console.log(car3);

car3.brake();
console.log(car3);

car3.accelerate();
console.log(car3);