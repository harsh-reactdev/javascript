'use strict';

import { userNameGenerator, accNoGenerator } from './utility-functions';

class User {
    constructor({ name, email, dob, password }) {
        this.userName = userNameGenerator(name);
        this.name = name;
        this.email = email;
        this.dob = dob;
        this.accountNumber = accNoGenerator();
        this.password = password;
        this.transactions = [];
        this.balance = 0;
    };
}

class MyBank {
    constructor() {
        this.users = [];
        this.activeUser = null;
    }

    #createUser(name, email, dob, password) {
        const user = new User(name, email, dob, password);
        this.users.push(user);
    }

    #authoriseUser(email, password) {
        const authorisedUser = this.users.find(user => user.email === email && user.password === password);
        if (authorisedUser) {
            this.activeUser = authorisedUser;
        } else {
            alert('Invalid credentials.!');
        }
    }

    login(email, password) {
        this.#authoriseUser(email, password);
    }

    signUp(name, email, dob, password) {
        if (this.users.find((user) => user.email === email)) {
            alert('User already exists.!');
            return;
        }
        if (name && email && dob && password)
            this.#createUser(name, email, dob, password);
        else alert('Fill all the details.!');
    }

    #initiateTransfer;
}

export default MyBank;