import SinglelyLinkedList from './singlely-linked-list';
class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
export default class SinglelyLinkedListCircle extends SinglelyLinkedList {
  constructor() {
    super();
  }
  prepend(data) {
    const newNode = new LinkedListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    if (this.tail === null) {
      this.tail = newNode;
      this.tail.next = this.head;
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
      this.tail.next = this.head;
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
      this.tail.next = this.head;
      this.length++;
    }
  }
  remove(data) {
    let current = this.head;
    let removedNode;

    // remove the head
    if (data === this.head.data) {
      removedNode = this.head;
      this.head = this.head.next;
      this.length--;
      this.tail.next = this.head;
      return removedNode;
    }
    // remove the tail
    if (current.next === null && current.data === data) {
      removedNode = this.tail;
      this.tail = current;
      this.tail.next = this.head;
      this.length--;
      return removedNode;
    }
    while (current.next !== null) {
      if (current.next.data === data) {
        removedNode = current.next;
        current.next = current.next.next;
        this.length--;
        this.tail.next = this.head;
        return removedNode;
      } else {
        current = current.next;
      }
    }
  }
}