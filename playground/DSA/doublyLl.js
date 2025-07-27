'use strict';

class Node {
    constructor(data) {
        this.left = null;
        this.data = data;
        this.right = null;
    }
}

class DoublyLl {
    constructor() {
        this.head = null;
    }

    insertNode(data) {
        if (this.head === null) {
            this.head = new Node(data);
            return;
        }

        let current = this.head;
        let prev;
        while (current.right !== null) {
            prev = current;
            current = current.right;
        }
        current.right = new Node(data);
        current.right.left = prev;
        return;
    }

    deleteNode(data) {
        if (this.head === null) {
            console.log('Doubly linked list empty.!');
            return;
        }

        let current = this.head;
        let prev;
        let next;

        if (this.head.data === data) {
            this.head = this.head.right;
            this.head.left = null;
            return;
        }
        while (current.data !== data) {
            prev = current;
            current = current.right;
        }
        if (current.right === null) {
            prev.right = null;
            return;
        }
        prev.right = current.right;
        current.right.left = current.left;
        return;
    }

    displayLl() {
        if (this.head === null) {
            console.log('Doubly linked list empty');
            return;
        }

        let current = this.head;
        let res = `${current.left} <---> `;

        while (current.right !== null) {
            res += `${current.data} <---> `;
            current = current.right;
        }
        res += `${current.data} <---> ${current.right}`;

        console.log(res);
    }
}

(() => {
    let dll = new DoublyLl();

    dll.insertNode(10);
    dll.insertNode(20);
    dll.insertNode(30);
    dll.insertNode(40);
    dll.insertNode(50);

    dll.displayLl();

    dll.deleteNode(50);
    dll.displayLl();

    dll.deleteNode(10);
    dll.displayLl();

    dll.deleteNode(30);
    dll.displayLl();

})();