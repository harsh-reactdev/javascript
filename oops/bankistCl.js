'use strict';

////////////////////////////////////////////////////////////////////////////////////
// Data Encapsulation : class fields and methods]
// // Public --> class fields and methods
// // Private --> class fields and methods
// // Static version of all four of the above

class Bankist {
    locale = navigator.language;
    bank = 'MyBank';
    #transactions = [];
    #pin;

    constructor(user, pin, currency) {
        this.user = user;
        this.#pin = pin;
        this.currency = currency;

        console.log(`Thanks for opening an account ${this.user}`);
    }

    getMovements() {
        return this.#transactions;
    }

    deposit(val) {
        this.#transactions.push(val);
        return this;
    }

    withdrawals(val) {
        this.deposit(-val);
        return this;
    }

    #approveLoan() {
        return true;
    }

    requestLoan(amount) {
        if (this.#approveLoan()) {
            this.deposit(amount);
        }
        return this;
    }


}