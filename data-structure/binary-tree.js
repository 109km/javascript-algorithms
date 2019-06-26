import Tree from './tree';

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class BinaryTree extends Tree {
  constructor() {
    super();
  }
  add(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let currentNode = this.root;
    while (currentNode) {
      let direction = 'right';
      if (data < currentNode.data) {
        direction = 'left';
      }
      if (currentNode[direction] === null) {
        currentNode[direction] = newNode;
        break;
      } else {
        currentNode = currentNode[direction];
      }
    }
  }
}