/**
 * @description
 * 给定一个单链表的头节点head，实现一个调整单链表的函数，使得每K个节点之间逆序，如果最后不够K个节点一组，则不调整最后几个节点。
 * 例如：链表：1->2->3->4->5->6->7->8->null，K=3。
 * 调整后为：3->2->1->6->5->4->7->8->null。其中7、8不调整，因为不够一组。
 */


import { LinkedListNode } from '../../data-structure/singlely-linked-list';

/**
 * @description
 * This method time complexity is O(n), and space complexity is O(k) 
 */
import DoubleEndedQueue from '../../data-structure/double-ended-queue';
function reverseLinkedListEachKNodesByQueue(head, k) {

  /**
   * @description Reverse the list by `k` and connect to the rest.
   * @param {Node} startNode 
   * @param {Number} k 
   * @param {DoubleEndedQueue} queue Using `stack` is also right.
   */
  function loopByGap(startNode, k, queue) {
    let head = startNode;
    let nextHead = null;
    let newHead = null;
    // Put the `k` nodes into the queue.
    for (let i = 0; i < k; i++) {
      queue.addLast(head);
      // This is the last node.
      if (head.next === null || i === k - 1) {
        nextHead = head.next;
        break;
      } else {
        head = head.next;
      }
    }

    // Reverse the `k` nodes,
    // if count is less than `k`, don't reverse.
    if (queue.length === k) {
      newHead = queue.popLast();
      head = newHead;
      while (!queue.isEmpty()) {
        head.next = queue.popLast();
        head = head.next;
      }
      head.next = nextHead;
    }
    return { newHead, nextHead };
  }


  let newHead = null;
  let current = head;
  let loopNum = 0;
  const queue = new DoubleEndedQueue();
  while (current !== null) {
    let o = loopByGap(current, k, queue);
    current = o['nextHead'];
    if (loopNum === 0) {
      newHead = o['newHead'];
    }
    loopNum++;
  }
  return newHead;
}

/**
 * @description This method's space complexity is O(1)
 * it needs no queue or stack.
 * And this method is from the book.
 * @param {Node} head 
 * @param {Number} k 
 */
function reverseLinkedListEachKNodes(head, k) {

  function resign(left, start, end, right) {
    let prev = left;
    let current = start;
    let next = null;
    // Reverse the nodes in this round.
    while (current !== right) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    // Connect last round's end node
    // to this round's start node.
    if (left !== null) {
      left.next = end;
    }
    // Connect this round's end node
    // to next round's start node.
    start.next = right;
  }

  if (k < 2) {
    return head;
  }
  let newHead = null;
  let current = head;
  let start = null;
  let prev = null;
  let next = null;
  let count = 1;
  while (current !== null) {
    next = current.next;
    if (count === k) {
      start = prev === null ? head : prev.next;
      newHead = prev === null ? current : newHead;
      resign(prev, start, current, next);
      prev = start; // This round's `start` is next round's `prev`
      count = 0;
    }
    count++;
    current = next;
  }
  return newHead;
}

function main() {
  const head = new LinkedListNode(1);
  let current = head;
  for (let i = 2; i <= 5; i++) {
    current.next = new LinkedListNode(i);
    current = current.next;
  }
  // const newHead = reverseLinkedListEachKNodesByQueue(head, 3);
  const newHead2 = reverseLinkedListEachKNodes(head, 3);
  console.log(newHead2);

}

main();