class Cars {
    constructor(model, make, mfg, fuel) {
        this.make = make;
        this.model = model;
        this.mfg = mfg;
        this.fuel = fuel;
    }

    getCarDetails = function () {
        return this;
    };
}

const car1 = new Cars('lamborghini', 'aventador', 2018, 'Petrol');

// console.log(car1);
// console.log(car1.getCarDetails());


// --------------------------------------------------------------
