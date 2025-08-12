'use strict';

// parent class
class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    };

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} going at ${this.speed} kmph`);
        return this;
    };

    brake() {
        this.speed -= 5;
        console.log(`Braking down to ${this.speed} kmph`);
        return this;
    };
}

// child class
class EV extends Car {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    };

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        console.log(`Battery charged to ${this.#charge}%.`);
        return this;
    };

    accelerate() {
        this.speed += 20;
        this.#charge -= 1;
        console.log(`${this.make} going at ${this.speed} kmph at ${this.#charge}% battery.`);
        return this;
    };
}

const byd = new EV('BYD', 120, 78);

const porsche = new Car('Porsche', 230);
porsche.accelerate().brake();
// porsche.accelerate();
// porsche.accelerate();

byd.accelerate().brake().chargeBattery(96);
// byd.chargeBattery(90);
// byd.accelerate();
// console.dir(byd);
