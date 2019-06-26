class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
}

export default class Tree {
  constructor() {
    this.root = null;
  }
  add(data, toNodeData) {
    const node = new Node(data);
    if (this.root === null) {
      this.root = node;
    } else {
      const toNode = this.findBFS(toNodeData);
      if (toNode !== null) {
        toNode.children.push(node);
      } else {
        throw new Error('Found no node.');
      }
    }
  }
  remove(data) {
    if (data === this.root.data) {
      this.root = null;
    } else {
      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        for (let [index, child] in node.children.entries()) {
          if (child.data === data) {
            node.children.splice(index, 1);
            return child;
          } else {
            queue.push(child);
          }
        }
      }
    }
    return node;
  }
  findBFS(data) {
    let queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (node.data === data) {
        return node;
      }
      queue = queue.concat(node.children);
    }
    return null;
  }
  print() {
    if (!this.root) {
      return console.log('No root node found');
    }
    const newline = new Node('\n------\n');
    const queue = [this.root, newline];
    let string = '';
    while (queue.length) {
      const node = queue.shift();
      string += node.data.toString() + (node !== newline ? ' ' : '');
      if (node === newline && queue.length) {
        queue.push(newline);
      }
      for (const child of node.children) {
        queue.push(child);
      }
    }
    console.log(string.trim());
  }
}


const tree = new Tree();
tree.add(0);
tree.add(10, 0);
tree.add(11, 0);
tree.add(20, 10);
tree.add(21, 10);
tree.add(22, 11);
tree.add(23, 11);
tree.print();