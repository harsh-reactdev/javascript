// circluar singly linked list

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CircularSinglyLinkedList {
    constructor() {
        this.head = null;
        // this.start = this.head;
    }

    insertNode(data) {
        if (this.head === null) {
            this.head = new Node(data);
            this.head.next = this.head;
            return;
        }

        let current = this.head;
        // let prev;
        while (current.next !== this.head) {
            // prev = current;
            current = current.next;
        }
        current.next = new Node(data);
        current.next.next = this.head;
        return;
    }

    deleteNode(data) {
        if (this.head === null) {
            console.log('Linked list is empty.!');
            return;
        }


        let current = this.head;
        let prev;

        if (this.head.data === data) {
            if (this.head.next === this.head) {
                this.head = null;
                return;
            } else {
                while (current.next !== this.head) {
                    current = current.next;
                }
                current.next = this.head.next;
                this.head = null;
                this.head = current.next;
                return;
            }
        }

        while (current.data !== data) {
            if (current.next === this.head) {
                console.log('Node doesn\'t exist.!');
                return;
            }
            prev = current;
            current = current.next;
        }
        prev.next = current.next;
    }

    displayLl() {
        if (this.head === null) {
            console.log('Linked list is empty.!');
            return;
        }
        let current = this.head;
        let res = '';
        while (current.next !== this.head) {
            res += `${current.data} ---> `;
            current = current.next;
        }
        res += `${current.data} ---> [start-Node]`;

        console.log(res);
    }
}

(() => {
    let csll = new CircularSinglyLinkedList();

    csll.insertNode(10);
    csll.insertNode(20);
    csll.insertNode(30);
    csll.insertNode(40);
    csll.insertNode(50);

    csll.displayLl();

    csll.deleteNode(40);
    csll.displayLl();

    csll.deleteNode(10);
    csll.displayLl();

})();
