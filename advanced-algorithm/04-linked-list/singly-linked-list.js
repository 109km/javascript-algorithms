class SinglyLinkedListNode {
  constructor(data, next) {
    this.data = data;
    this.next = next || null;
  }
}


class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  get length() {
    return this.size;
  }
  append(data) {
    const node = new SinglyLinkedListNode(data, null);
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
      this.size += 1;
    }
  }
  remove(data) {

    let current = this.head;
    // Record previous node.
    let prev = null;

    // List has only one node,
    // and happen to remove it.
    if (current.data === data) {
      this.head = null;
      this.size = 0;
      return;
    }

    while (current.next !== null) {
      // Check if is the target node
      if (current.data === data) {
        prev.next = current.next;
        this.size -= 1;
        break;
      }
      // Move to the next
      else {
        prev = current;
        current = current.next;
      }
    }

  }
}

const list = new SinglyLinkedList();

list.append(1);
list.append(2);
list.append(3);
list.remove(2);
console.log(list.head);
