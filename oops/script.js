'use strict';

const Person = function (name, birthyear) {
    this.name = name;
    this.birthyear = birthyear;
};

//////////////////////////////////////////////////////////
// setting properties in the prototype

Person.prototype.species = 'Homo Sapiens';

Person.prototype.calcAge = function () {
    console.log(2025 - this.birthyear);
};

const harsh = new Person('Harshith Shetty', 2000);

const sinch = new Person('SinShetty', 2003);

/////////////////////////////////////////////////////
console.log(harsh);
console.log(harsh.__proto__ === Person.prototype); //returns true
// it means that, Person.prototype gives us the prototype of the constructor function
// and this prototype itself is the prototype of the object instances created with that particular constructor function
// instance_name.__proto__ points to the prototype of the object

console.log(Person.prototype.isPrototypeOf(harsh)); //returns true
// because, Person.prototype is the prototype of all the objected created using the contructor function Person

harsh.calcAge();
sinch.calcAge();

console.log(harsh.hasOwnProperty('species')); //returns false, because soecies is simply inherited from the protoype Person

