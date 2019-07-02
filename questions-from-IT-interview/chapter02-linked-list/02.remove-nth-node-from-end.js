/**
 * @desc
 * 分别实现两个函数，一个可以删除单链表中倒数第K个节点，另一个可以删除双链表中倒数第K个节点
 * 如果链表长度为N，时间复杂度达到O（N），额外空间复杂度达到O（1）。
 * 
 * 下面函数中的`num`是按照人类惯用标识来计算的，比如 `num=2` 代表删除倒数第二个。
 */

import SinglelyLinkedList from '../../data-structure/singlely-linked-list';
import DoublelyLinkedList from '../../data-structure/doublely-linked-list';

function removeSinglelyLinkedListNthNodeFromTail(num, linkedList) {
  if (typeof num !== 'number') {
    throw new TypeError(`Parameter {num} must be a number`);
  }
  let count = linkedList.length - num + 1;
  // remove the first one
  if (count === 1) {
    linkedList.head = linkedList.head.next;
    return;
  }

  let current = linkedList.head;
  for (let i = 1; i < count - 1; i++) {
    current = current.next;
  }
  current.next = current.next.next;
}

function removeDoublelyLinkedListNthNodeFromTail(num, linkedList) {
  if (typeof num !== 'number') {
    throw new TypeError(`Parameter {num} must be a number`);
  }
  let current = linkedList.tail;
  for (let i = num - 1; i > 0; i--) {
    current = current.prev;
  }
  current.next.prev = current.prev;
  current.prev.next = current.next;
}

const singlelyList = new SinglelyLinkedList();
const doublelyList = new DoublelyLinkedList();

for (let i = 1; i < 10; i++) {
  singlelyList.append(i);
}
for (let i = 10; i < 20; i++) {
  doublelyList.append(i);
}

removeSinglelyLinkedListNthNodeFromTail(6, singlelyList);
removeDoublelyLinkedListNthNodeFromTail(2, doublelyList);
console.log(singlelyList.head.next.next);
console.log(doublelyList.tail.prev);