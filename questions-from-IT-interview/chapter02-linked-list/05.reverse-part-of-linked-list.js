/**
 * @desc
 * 给定一个单向链表的头节点head，以及两个整数from和to，在单向链表上把第from个节点到第to个节点这一部分进行反转。
 */
import SinglelyLinkedList from '../../data-structure/singlely-linked-list';
import Stack from '../../data-structure/stack';

function reverseLinkedListFromTo(from, to, linkList) {
  let current = linkList.head;
  let fromPrev = null;
  let currentIndex = 0;

  const stack = new Stack();

  while (current !== null) {
    if (currentIndex === from - 1) {
      fromPrev = current;
    }
    if (currentIndex >= from && currentIndex <= to) {
      stack.push(current);
    }
    current = current.next;
    currentIndex++;
  }

  while (!stack.isEmpty()) {
    fromPrev.next = stack.pop();
    fromPrev = fromPrev.next;
  }
  return linkList;
}

const list = new SinglelyLinkedList();

for (let i = 0; i < 5; i++) {
  list.append(i);
}

console.log(reverseLinkedListFromTo(1, 2, list));