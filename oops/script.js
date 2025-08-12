'use strict';

// const Person = function (name, birthyear) {
//     this.name = name;
//     this.birthyear = birthyear;
// };

// //////////////////////////////////////////////////////////
// // setting properties in the prototype

// Person.prototype.species = 'Homo Sapiens';

// Person.prototype.calcAge = function () {
//     console.log(2025 - this.birthyear);
// };

// const harsh = new Person('Harshith Shetty', 2000);

// const sinch = new Person('SinShetty', 2003);

/////////////////////////////////////////////////////
// console.log(harsh);
// console.log(harsh.__proto__ === Person.prototype); //returns true
// it means that, Person.prototype gives us the prototype of the constructor function
// and this prototype itself is the prototype of the object instances created with that particular constructor function
// instance_name.__proto__ points to the prototype of the object

////////////////////////////////////////////////////////////////////
// console.log(Person.prototype.isPrototypeOf(harsh)); //returns true
// because, Person.prototype is the prototype of all the objected created using the contructor function Person
////////////////////////////////////////////////////////////////////

// harsh.calcAge();
// sinch.calcAge();


////////////////////////////////////////////////////////////////////
// console.log(harsh.hasOwnProperty('species')); //returns false, because species is simply inherited from the protoype Person


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// protoype chain

// console.log(harsh.__proto__.__proto__); //returns the protoype of Person, which is of Object prototype, which is the top of prototype chain

// whenever a method or property is not available on the objects prototype, then it will look up the prototype chain
// very similar to scope chain

// console.log(harsh.__proto__.__proto__.__proto__); //returns null, marking the end of prototype chain


// //////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// ES6 Classes

// class expression
// const PersonCl = class { };

// class definition
// class PersonCl {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     // Instance methods
//     calcAge() {
//         console.log(2025 - this.age);
//     }

//     greet() {
//         console.log(`Hello, ${this.name}.`);
//     }

//     // Static method
//     // these are not available on the instances of this classes
//     // instead only on the class itself
//     static hey() {
//         console.log('Hey there 👋');
//     }
// }

// const harshCl = new PersonCl('harsh', 2000);
// PersonCl.hey();
// harshCl.hey(); //throws error
// harshCl.calcAge();
// harshCl.greet();


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// getters and setters (also called as accessor properties)

const account1 = {
    name: 'harsh',
    transactions: [120, 450, 980, 1300, 4300],

    get latest() {
        return this.transactions.slice(-1).pop();
    },

    set latest(tr) {
        this.transactions.push(tr);
    }
};

// console.log(account1.latest);
// account1.latest = 23000;
// console.log(account1);


class MyClass {
    constructor(initialValue) {
        // Directly assign to the backing property in the constructor
        this.myProperty = initialValue;
    }

    get myProperty() {
        return this._myProperty;
    }

    set myProperty(newValue) {
        // Perform validation or other logic here
        if (typeof newValue === 'string') {
            this._myProperty = newValue;
        } else {
            console.warn("myProperty can only be set to a string.");
        }
    }
}
// Here's why you might be encountering issues and how to correctly implement this:
// Direct Assignment in Constructor vs. Setter Invocation:
// When you write this.propertyName = value in the constructor, you are directly 
// assigning a value to a data property. This does not automatically trigger a setter, 
// even if one exists for propertyName. Setters are invoked when you later attempt to 
// assign a new value to propertyName using the assignment operator (=). 
// Using a "Backing" Property for Setters.
// To effectively use a setter to modify a property's value, you typically store 
// the "real" data in a separate, often conventionally "private" property 
// (e.g., prefixed with an underscore _). The setter then takes the assigned value,
// performs any necessary logic (validation, transformation), 
// and updates this backing property. The getter retrieves the value from this 
// backing property.


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// Object.create

const PersonProto = {
    calcAge: function () {
        return 2025 - this.birthyear;
    }
};

const harshObj = Object.create(PersonProto);

harshObj.name = 'Harsh';
harshObj.birthyear = 2000;
// console.log(harshObj.calcAge());


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// Inheritance

// using constructor functions
const Person = function (name, birthyear) {
    this.name = name;
    this.birthyear = birthyear;
};

Person.prototype.calcAge = function () {
    console.log(2025 - this.birthyear);
};

const Student = function (name, birthyear, course) {
    // inheriting from the parent class, Person
    Person.call(this, name, birthyear);

    // setting subclass specific properties
    this.course = course;
};

// setting the Student.prototype object to be an instance of Person.prototype
Student.prototype = Object.create(Person.prototype);
// console.log(Student.prototype);

Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
    console.log(`Hey all, I'm ${this.name} and I'm studying ${this.course}`);
};


const s1 = new Student('harsh', 2000, 'Computer Science');

// console.log(s1.__proto__ === Student.prototype); //returns true

// s1.introduce(); //works
// s1.calcAge(); //works

// console.log(Student.prototype instanceof Person); // returns true

// console.dir(Student.prototype.constructor);

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// Inheritance: ES6 Classes
class PersonCl {
    constructor(fullname, age) {
        this.fullname = fullname;
        this.age = age;
    }

    // Instance methods
    calcAge() {
        console.log(2025 - this.age);
    }

    greet() {
        console.log(`Hello, ${this.fullname}.`);
    }

    get fullname() {
        console.log(this._fullname);
    }

    set fullname(name) {
        name.includes(' ') ? this._fullname = name : alert('This is not a full name.');
    }

    static hey() {
        console.log('Hey there 👋');
    }
}

class StudentCl extends PersonCl {
    constructor(fullname, birthyear, course) {
        super(fullname, birthyear);
        this.course = course;
    }

    calcAge() {
        console.log(`I'm ${2025 - this.birthyear} old but in 
            univeristy I feel like I'm ${2025 - this.birthyear + 10}`);
    }

};

const harshSt = new StudentCl('harsh shetty', 2000, 'CSE');
// console.log(harshSt);

//////////////////////////////////////////////////////////////////////////////////
// Inheritance: Object.create()

const PetProto = {
    init(type, name, breed) {
        this.type = type;
        this.name = name;
        this.breed = breed;
    },

    greet() {
        console.log('Hey hooman.!');
    }
};

const CatProto = Object.create(PetProto);

CatProto.init = function (type, name, breed) {
    PetProto.init.call(this, type, name, breed);
};

CatProto.greet = function () {
    console.log('meow..');
};

const mimi = Object.create(CatProto);

mimi.init('cat', 'mimi', 'persian');
// console.log(mimi);

// mimi.greet();