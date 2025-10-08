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

  find(value) {
    let Current = this.root;

    while (Current) {
      if (Current.data > value) {
        Current = Current.left;
      } else if (Current.data < value) {
        Current = Current.right;
      } else if (Current.data === value) {
        return Current;
      } else {
        break;
      }
    }
    return "Value not found";
  }

  levelOrderForEach(callback) {
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  preOrderForEach(callback, node = this.root) {
    if (node === null) return;

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  inOrderForEach(callback,node = this.root) {
    if (node === null) return ;
    this.preOrderForEach(callback, node.left);
    callback(node.data)
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback , node = this.root) {
    if (node === null) return ;
    this.postOrderForEach(callback, node.left)
    this.preOrderForEach(callback, node.right);
    callback(node.data)
  }

  height(value) {
    let Is_ValueFound = false
    let level = 0
    let Current = this.root
    while(!Is_ValueFound) {
      if (value > Current.data) {
        Current = Current.right
        level ++
      }
      else if (value < Current.data) {
        Current = Current.left
        level ++
      } 
      else if (value === Current.data) {
        return level
      }
    }
    return "Value to found"
  }

  z
}

const tree = new Tree([40, 20, 10, 30, 60, 50, 70, 65, 80]);

tree.prettyPrint();


