/**
 * @description
 * 给定一个链表的头节点head，请判断该链表是否为回文结构。
 * 如果链表长度为N，时间复杂度达到O（N），额外空间复杂度达到O（1）。
 */

import SinglelyLinkedList from '../../data-structure/singlely-linked-list';
import Stack from '../../data-structure/stack';


/**
 * 
 * @param {SinglelyLinkedList} linkedList 
 */
function isPalindromicStructureByStack(linkedList) {
  const stack = new Stack();
  let current = linkedList.head;
  while (current !== null) {
    stack.push(current);
    current = current.next;
  }
  current = linkedList.head;
  while (current !== null) {
    const top = stack.pop();
    if (top.data === current.data) {
      current = current.next;
    } else {
      return false;
    }
  }
  return true;
}

const list = new SinglelyLinkedList();
list.append(1);
list.append(5);
list.append(1);

console.log(isPalindromicStructure(list));
