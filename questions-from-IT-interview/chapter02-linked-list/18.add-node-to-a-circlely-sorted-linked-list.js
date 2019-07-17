/**
 * @description
 * 一个环形单链表从头节点head开始不降序，
 * 同时由最后的节点指回头节点。
 * 给定这样一个环形单链表的头节点head和一个整数num，请生成节点值为num的新节点，
 * 并插入到这个环形链表中，保证调整后的链表依然有序。
 */
import { LinkedListNode as Node } from '../../data-structure/singlely-linked-list';

/**
 * @description Time complexity is O(N) and space complexity is O(1).
 * @param {Node} head 
 * @param {Number} num 
 */
function addNodeToCirclelySortedLinkedList(head, num) {
  let current = head;
  let prev = null;
  let newNode = null;
  while (current !== null) {
    if (num < current.data) {
      if (prev !== null && num >= prev.data) {
        newNode = new Node(num);
        prev.next = newNode;
        newNode.next = current;
        return head;
      }
    }
    prev = current;
    current = current.next;

    // The last node
    if (current === head && newNode === null) {
      newNode = new Node(num);
      prev.next = newNode;
      newNode.next = head;
      return newNode;
    }
  }
}

function main() {
  let head = new Node(2);
  let current = head;
  current.next = new Node(4);
  current = current.next;
  current.next = new Node(6);
  current = current.next;
  current.next = new Node(8);
  current = current.next;
  current.next = head;

  let newHead = addNodeToCirclelySortedLinkedList(head, 1);
  console.log(newHead);
}
main();