import { Node } from "./Node.js";

class Tree {
  constructor(Array) {
    this.root = this.buildTree(Array);
  }

  buildTree(array, start = 0, end = null) {
    if (end === null) {
      array = [...new Set(array)].sort((a, b) => a - b);
      end = array.length - 1;
    }

    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    if (start === 0 && end === array.length - 1) {
      this.root = node;
    }

    return node;
  }

  insert(value) {
    const temp = new Node(value);

    if (this.root === null) {
      this.root = temp;
      return;
    }

    let current = this.root;
    let parent = null;

    while (current !== null) {
      parent = current;
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return;
      }
    }

    if (parent.data > value) {
      parent.left = temp;
    } else {
      parent.right = temp;
    }
  }

  deleteItem(value) {
    let current = this.root;
    let parent = null;

    while (current !== null && current.data !== value) {
      parent = current;
      if (value > current.data) {
        current = current.right;
      } else if (value < current.data) {
        current = current.left;
      }
    }

    // Case 1
    if (current === null) return;

    if (current.left === null && current.right === null) {
      if (parent.left.data === value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // Case 2
    if (
      (current.left === null && current.right !== null) ||
      (current.right === null && current.left !== null)
    ) {
      const child = current.left !== null ? current.left : current.right;
      if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
    //Case 3
    if (current.left !== null && current.right !== null) {
      let Find_Successor = null;
      let parent_case3 = current;
      let current_case3 = current.right;

      while (current_case3 && current_case3.left !== null) {
        parent_case3 = current_case3;
        current_case3 = current_case3.left;
      }
      Find_Successor = current_case3.data;
      current.data = Find_Successor;

      if (parent_case3.left === current_case3) {
        parent_case3.left = current_case3.right;
      } else {
        parent_case3.right = current_case3.right;
      }
    }
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const tree = new Tree([40, 20, 10, 30, 60, 50, 70, 65, 80]);


