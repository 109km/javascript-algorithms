/**
 * @description 
 * 给定一个无序单链表的头节点head，实现单链表的选择排序。
 * 要求：额外空间复杂度为O（1）。
 */
import { LinkedListNode as Node } from '../../data-structure/singlely-linked-list';

/**
 * @description This method time complexity is O(N^2),
 * and space complexity is O(1)
 * @param {Node} head 
 */
function selectionSortSinglelyLinkedList(head) {

  // Find the smallest node's previous node
  // according on the head. 
  function findSmallest(head) {
    let smallest = head;
    let smallestPrev = null;
    let current = head;
    let prev = null;
    while (current !== null) {
      if (smallest.data > current.data) {
        smallest = current;
        smallestPrev = prev;
      }
      prev = current;
      current = current.next;
    }
    return smallestPrev;
  }

  // Find the smallest and put it to the head.
  let newHead = null;
  let newTail = null;
  while (head !== null) {
    let smallest = null;
    let smallestPrev = findSmallest(head);
    // Last one
    if (smallestPrev === null) {
      smallest = head;
      head = null;
    } else {
      smallest = smallestPrev.next;
      smallestPrev.next = smallestPrev.next.next;
    }
    if (newHead === null) {
      newHead = smallest;
      newTail = smallest;
    } else {
      newTail.next = smallest;
      newTail = newTail.next;
    }
  }
  return newHead;
}

function main() {
  const head = new Node(5);
  let current = head;
  current.next = new Node(3);
  current = current.next;
  current.next = new Node(1);
  current = current.next;
  current.next = new Node(2);

  const newHead = selectionSortSinglelyLinkedList(head);
  console.log(newHead);
}
main();