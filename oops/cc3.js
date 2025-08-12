'use strict';

// parent class
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} kmph`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.speed} kmph`);
};

// child class
const EV = function (make, speed, charge) {
    Car.call(this, make, speed);

    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
    console.log(`Battery charged to ${this.charge}%.`);
};

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed} kmph at ${this.charge}% battery.`);
};

const byd = new EV('BYD', 120, 78);

const porsche = new Car('Porsche', 230);
porsche.accelerate();
porsche.accelerate();
porsche.accelerate();

byd.accelerate();
byd.chargeBattery(90);
byd.accelerate();
// console.dir(byd);
