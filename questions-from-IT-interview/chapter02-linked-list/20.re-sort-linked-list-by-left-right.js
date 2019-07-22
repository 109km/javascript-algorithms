/**
 * @description
 * 给定一个单链表的头部节点head，链表长度为N，
 * 如果N为偶数，那么前N/2个节点算作左半区，后N/2个节点算作右半区；
 * 如果N为奇数，那么前N/2个节点算作左半区，后N/2+1个节点算作右半区。
 * 左半区从左到右依次记为L1->L2->…，右半区从左到右依次记为R1->R2->…，
 * 请将单链表调整成L1->R1->L2->R2->…的形式。
 */
import Node from '../../data-structure/singlely-linked-list-node';



/**
 * @description This method's space complexity is O(1),
 * time complexity is O(N).
 * @param {Node} head 
 * @param {Number} len 
 */
function reOrderLinkedListByGroup(head, len) {
  let headLeft = head;
  let headRight = null;
  let startOfRight = Math.floor(len / 2) + 1;

  // Find the head of right part.
  let i = 1;
  let current = head;
  while (i <= startOfRight) {
    headRight = current;
    current = current.next;
    i++;
  }

  // Remix the left part and the right part
  let newHead = head;
  let j = 1;
  let headLeftNext = headLeft.next;
  let headRightNext = headRight.next;
  while (j < startOfRight) {
    if (j === 1) {
      headLeft.next = headRight;
      headLeft = headLeft.next;
    } else {
      headLeft.next = headLeftNext;
      headLeft.next.next = headRightNext;
      headLeft = headLeft.next.next;
      headLeftNext = headLeftNext.next;
      headRightNext = headRightNext.next;
    }
    j++;
  }
  if (headRightNext !== null) {
    headLeft.next = headRightNext;
  }
  return newHead;
}

function main() {
  const head = new Node(1);
  head.init(2, 7);
  const newHead = reOrderLinkedListByGroup(head, 7);
  console.log(newHead);
}
main();