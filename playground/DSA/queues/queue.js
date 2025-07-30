'use strict';

class Queue {
    constructor() {
        this.queue = new Array();
    }

    isEmpty() {
        return !this.queue.length;
    }

    getSize() {
        console.log(this.queue.length);
    }

    enqueue(data) {
        this.queue.unshift(data);
        return;
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log('Queue is empty.!');
            return;
        }
        this.queue.pop();
        return;
    }

    peek() {
        console.log(this.queue[this.queue.length - 1]);
        return;
    }

    display() {
        this.queue.forEach((item) => {
            console.log(`${item} `);
        });
        return;
    }
}

(() => {
    const q = new Queue();

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);
    q.enqueue(50);
    q.enqueue(60);

    q.display();

    q.dequeue();
    q.display();
})();