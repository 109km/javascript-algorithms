/**
 * @desc
 * 给定一个单向链表的头节点head，以及两个整数from和to，在单向链表上把第from个节点到第to个节点这一部分进行反转。
 *  1. 如果链表长度为N，时间复杂度要求为O（N），额外空间复杂度要求为O（1）。
 *  2. 如果不满足1<=from<=to<=N，则不用调整。
 */
import SinglelyLinkedList from '../../data-structure/singlely-linked-list';

function reverseLinkedListFromTo(from, to, linkList) {

  if (from > to) {
    throw new TypeError(`\`from\` must be bigger than \`to\``);
  }

  let current = linkList.head;
  let fromPrev = null;
  let fromNode = null;
  let toNext = null;
  let currentIndex = 0;
  let prevNode = null;
  let nextNode = null

  while (currentIndex <= to) {
    if (currentIndex === from - 1) {
      fromPrev = current;
    }
    if (currentIndex === from) {
      fromNode = current;
    }
    if (currentIndex >= from && currentIndex <= to) {
      nextNode = current.next;
      current.next = prevNode;
      prevNode = current;
      current = nextNode;
    } else {
      current = current.next;
    }
    // When reach the end of the reverse part,
    // we need to make the whole link connected.
    if (currentIndex === to) {
      fromPrev.next = prevNode;
      fromNode.next = current;
    }
    currentIndex++;
  }

  return linkList;
}

const list = new SinglelyLinkedList();
for (let i = 0; i < 10; i++) {
  list.append(i);
}
reverseLinkedListFromTo(2, 4, list);
console.log(list.head.next); // 0->1->4->3->2->5...