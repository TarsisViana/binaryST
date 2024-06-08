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

    function toBBST(array, start, end) {
      if (start > end) return null;

      let mid = parseInt((start + end) / 2);
      let node = new Node(array[mid]);

      node.left = toBBST(array, start, mid - 1);
      node.right = toBBST(array, mid + 1, end);

      return node;
    }

    return toBBST(orderedArr, 0, orderedArr.length - 1);
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
}

const test = [1, 7, 4, 23, 8, 3, 9, 4, 5, 7, 9, 67, 6345, 324];
const balancedTree = new Tree(test);
prettyPrint(balancedTree.root);
balancedTree.insert(6);
prettyPrint(balancedTree.root);
balancedTree.deleteItem(4);
prettyPrint(balancedTree.root);
