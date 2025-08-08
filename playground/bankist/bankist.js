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

    #initiateTransfer(receiver, amount) {
        if (receiver !== this.activeUser.userName && this.activeUser.balance > amount) {
            if (this.users.find(user => user.userName == receiver)) {
                receiver.transactions.push(amount);
                this.activeUser.transactions.push(-amount);
            }
        }
    };

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

    handleTransfer(receiver, amount) {
        this.#initiateTransfer(receiver, amount);
    }
}

export default MyBank;