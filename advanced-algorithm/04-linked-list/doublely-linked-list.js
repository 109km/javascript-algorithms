class DoublyLinkedListNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  get length() {
    return this.size;
  }
  append(data) {
    const node = new DoublyLinkedListNode(data);
    // List is empty
    if (this.head === null) {
      this.head = node;
    }
    // List is not empty, append the new node to the last node.
    // Time complexity is O(n)
    else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
      node.prev = current;
      this.size += 1;
    }
  }
  remove(data) {

  }
}