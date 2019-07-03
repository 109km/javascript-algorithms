/**
 * @desc
 * 分别实现反转单向链表和反转双向链表的函数。
 */

import SinglelyLinkedList from '../../data-structure/singlely-linked-list';
import DoublelyLinkeList from '../../data-structure/doublely-linked-list';


function reservseSinglelyLinkedList(linkedList) {
  const reversedLinkedList = new SinglelyLinkedList();
  let current = linkedList.head;
  while (current !== null) {
    reversedLinkedList.prepend(current.data);
    current = current.next;
  }
  return reversedLinkedList;
}

function reservseSinglelyLinkedListWithoutReturn(linkedList) {
  let prev = null;
  let next = null;
  let current = linkedList.head;
  while (current != null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  let newHead = linkedList.head;
  linkedList.head = linkedList.tail;
  linkedList.tail = newHead;
  return linkedList;
}

function reverseDoublelyLinkedList(linkedList) {
  const reversedLinkedList = new DoublelyLinkeList();
  let current = linkedList.tail;
  while (current !== null) {
    reversedLinkedList.append(current.data);
    current = current.prev;
  }
  return reversedLinkedList;
}


const list1 = new SinglelyLinkedList();
const list2 = new DoublelyLinkeList();
for (let i = 1; i <= 10; i++) {
  list1.append(i);
  list2.append(i);
}
console.log(reservseSinglelyLinkedListWithoutReturn(list1));
console.log(reverseDoublelyLinkedList(list2));
