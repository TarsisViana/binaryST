import Node from "./node.mjs";
import mergeSort from "./mergeSort.mjs";
import removeDuplicates from "./removeduplicates.mjs";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Tree {
  constructor(array) {
    this.arr = array;
    this.root = this.buildTree(this.arr);
  }

  buildTree(arr) {
    let orderedArr = mergeSort(arr);
    orderedArr = removeDuplicates(orderedArr);

    return this.toBBST(orderedArr, 0, orderedArr.length - 1);
  }

  toBBST(array, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = this.toBBST(array, start, mid - 1);
    node.right = this.toBBST(array, mid + 1, end);

    return node;
  }

  insert(value, root = this.root) {
    if (root == null) {
      root = new Node(value);
      return root;
    } else if (root.value > value) {
      root.left = this.insert(value, root.left);
    } else if (root.value < value) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root.value == null) {
      return root;
    }

    if (value < root.value) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.value) {
      root.right = this.deleteItem(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      }
      if (root.right == null) {
        return root.left;
      }
      root.value = this.minValue(root.right);

      root.right = this.deleteItem(root.value, root.right);
    }

    return root;
  }

  minValue(root) {
    let value = root.value;
    while (root.left != null) {
      value = root.left.value;
      root = root.left;
    }
    return value;
  }

  find(value, root = this.root) {
    let node;
    if (root == null) return null;

    if (value < root.value) {
      node = this.find(value, root.left);
    } else if (value > root.value) {
      node = this.find(value, root.right);
    } else {
      return root;
    }

    return node;
  }

  levelOrder(callback, root = this.root) {
    let arr = [];
    if (root == null) return;
    let q = [root]; //use  an array as a queue
    while (q.length > 0) {
      let current = q[0];
      if (callback) {
        callback(current);
      }
      if (current.left) q.push(current.left);
      if (current.right) q.push(current.right);
      arr.push(current.value);
      q.shift(); // remove the first element
    }
    return arr;
  }

  inOrder(root = this.root, callback, arr = []) {
    if (root == null) return; //base condition

    this.inOrder(root.left, callback, arr);
    if (callback) callback(root.value);
    else arr.push(root.value);
    this.inOrder(root.right, callback, arr);

    if (!callback) return arr;
  }

  preOrder(root = this.root, callback, arr = []) {
    if (root == null) return; //base condition

    if (callback) callback(root.value);
    else arr.push(root.value);
    this.preOrder(root.left, callback, arr);
    this.preOrder(root.right, callback, arr);

    if (!callback) return arr;
  }

  postOrder(root = this.root, callback, arr = []) {
    if (root == null) return; //base condition

    this.preOrder(root.left, callback, arr);
    this.preOrder(root.right, callback, arr);

    if (callback) callback(root.value);
    else arr.push(root.value);

    if (!callback) return arr;
  }

  height(root = this.root) {
    if (root == null) return 0;

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, root = this.root) {
    if (root == null) return -1; //if not found

    let distance = -1;

    if (root.value === value) return distance + 1; //check node

    distance = this.depth(value, root.left); //check left subtree
    if (distance >= 0) return distance + 1; //check if it was found
    distance = this.depth(value, root.right); //check right
    if (distance >= 0) return distance + 1; //check if it was found

    return distance;
  }

  get() {
    return this.root;
  }

  isBalanced(root = this.root) {
    if (root == null) return 0;

    //check left subtree
    let leftHeight = this.isBalanced(root.left);
    if (leftHeight == -1) return -1;
    //if the left subtree is not balanced the entire tree is not balanced, return -1

    //check right subtree
    let rightHeight = this.isBalanced(root.right);
    if (rightHeight == -1) return -1;

    // check the diference of the left and right subtrees
    if (leftHeight - rightHeight > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance(root = this.root) {
    let orderedArr = this.inOrder();
    this.root = this.toBBST(orderedArr, 0, orderedArr.length - 1);
  }
}

const test = [1, 7, 4, 23, 8, 3, 9, 4, 5, 7, 9, 67, 6345, 324];
const balancedTree = new Tree(test);
prettyPrint(balancedTree.root);
balancedTree.insert(6);
prettyPrint(balancedTree.root);
balancedTree.deleteItem(4);
prettyPrint(balancedTree.root);
console.log(balancedTree.find(67));
console.log(balancedTree.find(2));
console.log(balancedTree.levelOrder());
console.log(balancedTree.inOrder());
console.log(balancedTree.preOrder());
console.log(balancedTree.postOrder());
console.log(balancedTree.height());
console.log(balancedTree.depth(1));
console.log(balancedTree.isBalanced());
balancedTree.insert(100);
balancedTree.insert(101);
balancedTree.insert(110);
console.log(balancedTree.isBalanced());
prettyPrint(balancedTree.root);
balancedTree.rebalance();
console.log(balancedTree.isBalanced());
prettyPrint(balancedTree.root);
