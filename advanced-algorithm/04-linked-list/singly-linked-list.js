class SinglyLinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
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
    const node = new SinglyLinkedListNode(data);
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

const list1 = new SinglyLinkedList();
list1.append(1);
list1.append(2);
list1.append(4);

const list2 = new SinglyLinkedList();
list2.append(3);
list2.append(4);
list2.append(6);
list2.append(8);

const mergedList = new SinglyLinkedList();
let pointer1 = list1.head;
let pointer2 = list2.head;

while (true) {
  // Both linked list reached the end.
  if (pointer1 === null && pointer2 === null) {
    break;
  }


  if (pointer2.data > pointer1.data) {

  }


}

console.log(mergedList.head);
