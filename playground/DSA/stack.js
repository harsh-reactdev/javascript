'use strict';

class Stack {
    constructor() {
        this.__data__ = new Array();
    }

    push(data) {
        this.__data__.push(data);
        return;
    }

    pop() {
        if (!this.__data__.length) {
            console.log('Stack empty.!');
            return;
        }
        this.__data__.pop();
        return;
    }

    display() {
        if (!this.__data__.length) {
            console.log('Stack empty.!');
            return;
        }
        this.__data__.forEach((item) => {
            console.log(`${item} `);
        });
        return;
    }
}

(() => {
    const st = new Stack();

    st.push(10);
    st.push(20);
    st.push(30);
    st.push(40);
    st.push(50);
    st.push(60);

    st.display();

    st.pop();
    st.display();
})();