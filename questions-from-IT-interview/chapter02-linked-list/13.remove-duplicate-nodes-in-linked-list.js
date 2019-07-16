/**
 * @description 
 * 给定一个无序单链表的头节点head，删除其中值重复出现的节点。
 * 例如：1->2->3->3->4->4->2->1->1->null，删除值重复的节点之后为1->2->3->4->null。
 * 请按以下要求实现两种方法。
 * 方法1：如果链表长度为N，时间复杂度达到O（N）。
 * 方法2：额外空间复杂度为O（1）。
 */

import { LinkedListNode as Node } from '../../data-structure/singlely-linked-list';
import HashMap from '../../data-structure/hash-table';


/**
 * @description This method's time complexity is O(N), space complexity is O(N)
 * @param {Node} head 
 */
function removeDuplicateNode1(head) {
  const map = new HashMap();
  let current = head;
  let prev = null;
  while (current !== null) {
    let key = current.data;
    if (map.get(key)) {
      prev.next = current.next;
    } else {
      map.set(key, true);
      prev = current;
    }
    current = current.next;
  }
  return head;
}

/**
 * @description This method's time complexity is O(N^2), space complexity is O(1)
 * Remove nodes of one value in each loop.
 * @param {Node} head
 */
function removeDuplicateNode2(head) {
  let current = head;

  function removeNode(node) {
    const data = node.data;
    const head = node;
    let prev = null;
    let current = head;
    while (current !== null) {
      if (current.data === data && prev !== null) {
        prev.next = current.next;
      }
      prev = current;
      current = current.next;
    }
    return head;
  }

  while (current !== null) {
    current = removeNode(current);
    current = current.next;
  }
  return head;
}


function main() {
  const head = new Node(1);
  let current = head;
  for (let i = 2; i < 5; i++) {
    current.next = new Node(i);
    current = current.next;
  }
  for (let i = 3; i < 6; i++) {
    current.next = new Node(i);
    current = current.next;
  }
  // removeDuplicateNode1(head);
  removeDuplicateNode2(head);
  console.log(head.next.next);
}
main();