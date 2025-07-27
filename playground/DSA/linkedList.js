class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertNode(data) {
        if (this.head === null) {
            this.head = new Node(data);
        } else {
            let current = this.head;

            while (current.next) {
                current = current.next;
            }
            current.next = new Node(data);
        }
    }

    deleteNode(data) {
        if (this.head === null) {
            console.log("Linked list empty.!");
            return;
        } else {
            let current = this.head;
            if (current.data === data) {
                this.head = this.head.next;
            } else {
                let prev;
                while (current.data !== data) {
                    prev = current;
                    current = current.next;
                }
                prev.next = current.next ? current.next : null;
            }
        }
    }

    display() {
        let current = this.head;
        let res = '';
        while (current.next) {
            res += `${current.data} ---> `;
            current = current.next;
        }
        res += current.data;

        console.log(res);
    }
}

(() => {
    let ll = new LinkedList();

    ll.insertNode(10);
    ll.insertNode(20);
    ll.insertNode(30);
    ll.insertNode(40);
    ll.insertNode(50);

    ll.display();

    ll.deleteNode(30);
    ll.display();

    ll.deleteNode(10);
    ll.display();
})();