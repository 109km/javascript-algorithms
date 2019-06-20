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
  append(data) {
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
  find(data, callback) {
    let current = this.head;
    while (current !== null) {
      if (callback && callback(current)) {
        return current;
      }
      if (data && data === current.data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
  remove(toNodeData) {
    let removeNode = this.find(toNodeData);
    // remove head
    if (removeNode.prev === null) {
      this.head = removeNode.next;
      removeNode.next.setPrev(null);
    }
    // remove tail
    else if (removeNode.next === null) {
      this.tail = removeNode.prev;
      removeNode.prev.setNext(null);
    }
    else {
      removeNode.prev.setNext(removeNode.next);
    }
    return removeNode;
  }
  insertAfter(toNodeData, data) {
    let afterNode = this.find(toNodeData);
    if (afterNode && data) {
      let newNode = new LinkedListNode(data);
      afterNode.next.setPrev(newNode);
      afterNode.setNext(newNode);
      newNode.setNext(afterNode.next);
    }else{
      console.error(`Node not found`);
    }
  }
}

const list = new DoublelyLinkedList();
list.append(1);
list.append(2);
list.append(3);
list.insertAfter(1, 4);

console.log(list.find(4));