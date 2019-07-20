/**
 * @description 给定两个有序单链表的头节点head1和head2，请合并两个有序链表，合并后的链表依然有序，并返回合并后链表的头节点。
 */

import Node from '../../data-structure/singlely-linked-list-node';

/**
 * @description This method's time comlexity is O(M+N)
 * and space complexity is O(1)
 * @param {Node} head1 
 * @param {Node} head2 
 */
function mergeTwoSortedLinkedList(head1, head2) {
  let current1 = head1;
  let current2 = head2;
  let current3 = null;
  let newHead = null;
  while (current1 !== null && current2 !== null) {
    let newNode;
    if (current1.data <= current2.data) {
      newNode = new Node(current1.data);
      current1 = current1.next;
    } else {
      newNode = new Node(current2.data);
      current2 = current2.next;
    }
    if (newHead === null) {
      newHead = newNode;
      current3 = newHead;
    } else {
      current3.next = newNode;
      current3 = current3.next;
    }
  }

  // merge the left nodes
  let current = current1 !== null ? current1 : current2;
  while (current !== null) {
    current3.next = new Node(current.data);
    current3 = current3.next;
    current = current.next;
  }
  return newHead;
}

function main() {
  const head1 = new Node(4);
  head1.init(6, 8);
  const head2 = new Node(3);
  head2.init(4, 8);
  const head3 = mergeTwoSortedLinkedList(head1, head2);
  console.log(head3.next.next.next.next.next.next.next);
}
main();