class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglelyLinkedList {
  constructor() {
    this.head = null;
  }
  add(data) {
    const newNode = new LinkedListNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.getTail();
      current.next = newNode;
    }
  }
  get(index) {
    let current = this.head;
    for (let i = 1; current.next != null && i <= index; i++) {
      current = current.next;
    }
    return current;
  }
  remove(index) {
    let current = this.get(index);
    // remove the last node
    if (current.next === null) {
      let prev = this.get(index - 1);
      prev.next = null;
      return current;
    }

    // remove the first node
    if (index === 0) {
      this.head = current.next;
      return current;
    }
    // remove the middle nodes
    else if (index > 0) {
      let prev = this.get(index - 1);
      let next = this.get(index + 1);
      prev.next = next;
      return current;
    }
  }
  insertAfter(index, data) {
    let afterNode = this.get(index);
    let newNode = new LinkedListNode(data);

    if (afterNode.next !== null) {
      let afterNextNode = this.get(index + 1);
      newNode.next = afterNextNode;
    }
    afterNode.next = newNode;

  }
  getHead() {
    return this.head;
  }
  getTail() {
    let current = this.head;
    while (current !== null && current.next !== null) {
      current = current.next;
    }
    return current;
  }
}

const list = new SinglelyLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.remove(0);
list.remove(2);
console.log(list);