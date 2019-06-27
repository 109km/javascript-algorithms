class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class SinglelyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  prepend(data) {
    const newNode = new LinkedListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    if (this.tail === null) {
      this.tail = newNode;
    }
  }
  append(data) {
    const newNode = new LinkedListNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  find(data, callback) {
    let current = this.head;
    while (current !== null) {
      if (callback && callback(current)) {
        return current;
      }

      if (typeof data !== 'undefined' && current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
  remove(data) {
    let current = this.head;
    let removedNode;

    // remove the head
    if (data === this.head.data) {
      removedNode = this.head;
      this.head = this.head.next;
      return removedNode;
    }
    // remove the tail
    if (current.next === null && current.data === data) {
      removedNode = this.tail;
      this.tail = current;
      return removedNode;
    }
    while (current.next !== null) {
      if (current.next.data === data) {
        removedNode = current.next;
        current.next = current.next.next;
        return removedNode;
      } else {
        current = current.next;
      }
    }
    
  }
  insertAfter(data, toNodeData) {
    let afterNode = this.find(toNodeData);
    if (afterNode && data) {
      let newNode = new LinkedListNode(data);
      newNode.next = afterNode.next;
      afterNode.next = newNode;
    }
  }
}

// const list = new SinglelyLinkedList();
// list.append(1);
// list.append(2);
// list.append(3);
// list.remove(1);
// console.log(list);