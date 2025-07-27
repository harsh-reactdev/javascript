// circluar doubly linked list
'use strict';

class Node {
    constructor(data) {
        this.left = null;
        this.data = data;
        this.right = null;
    }
}

class CircularDoublyLinkedList {
    constructor() {
        this.head = null;
    }

    insertNode(data) {
        if (this.head === null) {
            this.head = new Node(data);
            this.head.left = this.head;
            this.head.right = this.head;
            return;
        }

        let current = this.head;
        let prev;

        while (current.right !== this.head) {
            prev = current;
            current = current.right;
        }
        current.right = new Node(data);
        current.right.left = current;
        current.right.right = this.head;
        return;
    }

    deleteNode(data) {
        if (this.head === null) {
            console.log('Linked list empty.!');
            return;
        }

        let current = this.head;
        let prev;

        if (this.head.data === data) {
            if (this.head.right === this.head) {
                this.head = null;
                return;
            } else {
                while (current.right !== this.head) {
                    current = current.right;
                }
                current.right = this.head.right;
                // this.head = null;
                this.head = current.right;
                this.head.left = current;
                return;
            }
        }
        while (current.data !== data) {
            prev = current;
            current = current.right;
        }
        prev.right = current.right;
        current.right.left = prev;
        return;
    }

    displayLl() {
        if (this.head === null) {
            console.log('Linked list empty.!');
            return;
        }

        let current = this.head;
        let res = '';
        res += `[end node] `;
        while (current.right !== this.head) {
            res += `<---> ${current.data} `;
            current = current.right;
        }
        res += ` <---> ${current.data} <---> [start node]`;

        console.log(res);
        return;
    }
}

(() => {
    let cdll = new CircularDoublyLinkedList();

    cdll.insertNode(1);
    cdll.insertNode(2);
    cdll.insertNode(3);
    cdll.insertNode(4);
    cdll.insertNode(5);
    cdll.insertNode(6);

    cdll.displayLl();

    cdll.deleteNode(1);
    cdll.displayLl();

    cdll.deleteNode(6);
    cdll.displayLl();
})();