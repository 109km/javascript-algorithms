class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
  setPrev(node) {
    this.prev = node;
  }
  setNext(node) {
    this.next = node;
  }
}

class DoublelyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(data) {
    let node = null;
    node = new LinkedListNode(data);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.setNext(node);
      node.setPrev(this.tail);
    }
    this.tail = node;
  }
  get(index) {
    let current = this.head;
    let i = 0;
    while (current.next !== null && i < index) {
      current = current.next;
      i++;
    }
    return current;
  }
  remove(index) {
    let removeNode = this.get(index);
    if (removeNode.prev === null) {
      removeNode = this.head;
      this.head = this.get(1);
      this.head.setPrev(null);
    } else if (removeNode.next === null) {
      removeNode = this.tail;
      this.tail = this.get(index - 1);
      this.tail.setNext(null);
    } else {
      let prevNode = this.get(index - 1);
      let nextNode = this.get(index + 1);
      prevNode.setNext(nextNode);
      nextNode.setPrev(prevNode);
    }
    return removeNode;
  }
  insertAfter(index, data) {
    let afterNode = this.get(index);
    let newNode = new LinkedListNode(data);
    if (afterNode.next !== null) {
      let afterNextNode = this.get(index + 1);
      afterNextNode.setPrev(newNode);
      newNode.setNext(afterNextNode);
    }
    afterNode.setNext(newNode);
  }
}

const list = new DoublelyLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.insertAfter(1,4);

console.log(list.get(1));