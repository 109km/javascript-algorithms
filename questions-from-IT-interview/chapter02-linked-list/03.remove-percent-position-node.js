/**
 * @desc
 * 给定链表的头节点head、整数a和b，实现删除位于a/b处节点的函数。
 */

import SinglelyLinkedList from '../../data-structure/singlely-linked-list';

function removeNodeByPercent(linkList, a, b) {
  const len = linkList.length;

  let nth = Math.round(len * a / b);

  if (nth === 0) {
    return null;
  }

  let current = linkList.head;
  while (nth > 2) {
    current = current.next;
    nth--;
  }
  const removedNode = current.next;
  current.next = current.next.next;
  return removedNode;
}


const linkedList = new SinglelyLinkedList();
for (let i = 1; i <= 10; i++) {
  linkedList.append(i);
}

const removedNode = removeNodeByPercent(linkedList, 2, 10);
console.log(removedNode);
