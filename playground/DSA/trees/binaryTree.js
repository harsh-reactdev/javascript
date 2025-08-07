class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// general binary tree
class BinaryTree {
    constructor() {
        this.root = null;
        this.incomplete = [];
    }

    insertNode(data) {
        if (!this.root) {
            this.root = new Node(data);
            return;
        }

        let currentNode = this.root;

        while (currentNode) {
            // check if current node's left is null and insert new node.
            if (!currentNode.left) {
                currentNode.left = new Node(data);
                this.incomplete.push(currentNode.left);
                return;
            }
            // check if current node's right is null and insert new node.
            if (!currentNode.right) {
                currentNode.right = new Node(data);
                this.incomplete.push(currentNode.right);
                this.incomplete.pop();
                return;
            }

            // updating current node value
            if (this.incomplete.includes(currentNode.left)) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
    }

    //displaing tree: in-order traversal
    inOrder() {
        if (!this.root) {
            console.log('Tree empty.!');
            return;
        }

        let current = this.root;

        function inorderTraversal(node) {
            if (node === null) return;
            inorderTraversal(node.left);
            console.log(node.data);
            inorderTraversal(node.right);
        }

        inorderTraversal(current);
    }

    // Displaying tree : pre-order traversal
    preOrder() {
        if (!this.root) {
            console.log('Tree empty.!');
            return;
        }

        let current = this.root;
    }

    // displaying tree: level order traversal
    displayTree() {
        if (!this.root) {
            console.log('Tree empty.!');
            return;
        }

        let current = this.root;
        let unvisited = [];

        while (current) {
            console.log(current.data);

            if (current.left) {
                unvisited.unshift(current.left);
            }
            if (current.right) {
                unvisited.unshift(current.right);
            }

            current = unvisited.pop();
        }
    }
}


(() => {
    let bt = new BinaryTree();

    bt.insertNode(1);
    bt.insertNode(2);
    bt.insertNode(3);
    bt.insertNode(4);
    bt.insertNode(5);
    bt.insertNode(6);
    bt.insertNode(7);

    // bt.displayTree();

    // bt.inOrder();

    bt.preOrder();

})();