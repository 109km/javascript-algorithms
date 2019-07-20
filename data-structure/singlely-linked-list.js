import LinkedListNode from './singlely-linked-list-node';
export { LinkedListNode };

export default class SinglelyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  prepend(data) {
    const newNode = new LinkedListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    if (this.tail === null) {
      this.tail = newNode;
    }
    this.length++;
  }
  append(data) {
    // 加入的数据也可是一个链表
    if (data instanceof SinglelyLinkedList) {
      if (this.head === null) {
        this.head = data.head;
        this.tail = data.tail;
      } else {
        this.tail.next = data.head;
        this.tail = data.tail;
      }
      this.length += data.length;
    } else {
      const newNode = new LinkedListNode(data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
    }
  }
  find(data, callback) {
    let current = this.head;
    while (current !== null) {
      if (callback && callback(current)) {
        return current;
      }
      if (data !== null && current.data === data) {
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
      this.length--;
      return removedNode;
    }
    // remove the tail
    if (current.next === null && current.data === data) {
      removedNode = this.tail;
      this.tail = current;
      this.length--;
      return removedNode;
    }
    while (current.next !== null) {
      if (current.next.data === data) {
        removedNode = current.next;
        current.next = current.next.next;
        this.length--;
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
      this.length++;
    }
  }
  reverse() {
    let prev = null;
    let next = null;
    let current = this.head;
    while (current != null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    let newHead = this.head;
    this.head = this.tail;
    this.tail = newHead;
    return this;
  }
  init(start = 1, end = 10) {
    let i = start;
    for (; i <= end; i++) {
      this.append(i);
    }
  }
}

// const list = new SinglelyLinkedList();
// list.append(1);
// list.append(2);
// list.append(3);
// list.remove(1);
// console.log(list);