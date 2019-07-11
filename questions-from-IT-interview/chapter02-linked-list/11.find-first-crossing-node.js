/**
 * @description
 * 在本题中，单链表可能有环，也可能无环。
 * 给定两个单链表的头节点head1和head2，
 * 这两个链表可能相交，也可能不相交。
 * 请实现一个函数，如果两个链表相交，请返回相交的第一个节点；如果不相交，返回null即可。
 * @require
 * 要求：如果链表1的长度为N，链表2的长度为M，时间复杂度请达到O（N+M），额外空间复杂度请达到O（1）。
 */

/**
 * @solution
 * 1. Judge the two linked lists both are in line or are cyclic.
 * 2. If they are in line, they must have the same end point.
 * 3. If they are cyclic, they must have the same circle. 
 */

import SinglelyLinkedlist from '../../data-structure/singlely-linked-list';
import SinglelyLinkedListCyclic from '../../data-structure/singlely-linked-list-circle';
import Stack from '../../data-structure/stack';
/**
 * @description 
 * @param {SinglelyLinkedlist} list
 * @returns {Boolean} `true` is lined `false` is cyclic.
 */
function checkIsLineOrCyclic(list) {
  let slowPointer = list.head;
  let fastPointer = list.head;
  while (fastPointer !== null) {
    if (fastPointer.next === null || fastPointer.next.next === null) {
      return true;
    }
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer) {
      return false;
    }
  }
}

/**
 * @description This function's complexity is O(m+n)
 * @param {SinglelyLinkedList} list1 
 * @param {SinglelyLinkedList} list2 
 */
function _findCrossingPointInLineWithStack(list1, list2) {
  if (list1.tail !== list2.tail) {
    return null;
  }
  let point = null;
  let current1 = list1.head;
  let current2 = list2.head;
  const stack1 = new Stack();
  const stack2 = new Stack();
  while (current1 != null) {
    stack1.push(current1);
    current1 = current1.next;
  }
  while (current2 != null) {
    stack2.push(current2);
    current2 = current2.next;
  }
  current1 = stack1.getTop();
  current2 = stack2.getTop();
  while (current1.data === current2.data) {
    point = current1;
    current1 = stack1.pop();
    current2 = stack2.pop();
  }
  return point;
}

/**
 * @description This function's complexity is O(1).
 * @param {SinglelyLinkedList} list1 
 * @param {SinglelyLinkedList} list2 
 */
function _findCrossingPointInLineWithoutStack(list1, list2) {

}

/**
 * @description This is just a transfer function, easily to switch the real called functions.
 * @param {SinglelyLinkedList} list1 
 * @param {SinglelyLinkedList} list2 
 */
function findCrossingPointInLine(list1, list2) {
  return _findCrossingPointInLineWithStack(list1, list2);
}



function findLoopPoint(list) {
  const len = list.length;
  let current = list.head;
  for (let i = 0; i < len; i++) {
    current = current.next;
  }
  return current;
}

/**
 * @description
 * 1. If the crossing point is before the loop, it's like to find the crossing point in line.
 * 2. If the crossing point is in the loop, so no matter start to move from `loop1` or `loop2`, another point must be met.
 * @param {SinglelyLinkedListCyclic} list1 
 * @param {SinglelyLinkedListCyclic} list2 
 */
function findCrossingPointInCircle(list1, list2) {

  const loop1 = findLoopPoint(list1);
  const loop2 = findLoopPoint(list2);

  // Case1 : crossing point is in the loop and they are the same.
  if (loop1 === loop2) {
    return loop1;
  }

  // Case2 : crossing point is in the loop and they are different.
  let current = loop1;
  for (let i = 0; i < len; i++) {
    if (loop2 === current) {
      return [loop1, loop2];
    }
    current = current.next;
  }

  // Case3 : crossing point is before the loop point.
  const stack1 = new Stack();
  const stack2 = new Stack();
  let current1 = list1.head;
  let current2 = list2.head;
  while (current1 !== loop1) {
    stack1.push(current1);
    current1 = current1.next;
  }
  while (current2 !== loop2) {
    stack2.push(current2);
    current2 = current2.next;
  }
  let point = null;
  while (stack1.getTop() === stack2.getTop()) {
    point = stack1.getTop();
    stack1.pop();
    stack2.pop();
  }
  return point;

}

function findCrossingPoint(list1, list2) {
  const isList1Lined = checkIsLineOrCyclic(list1);
  const isList2Lined = checkIsLineOrCyclic(list2);
  if (isList1Lined === isList2Lined) {
    if (isList1Lined) {
      return findCrossingPointInLine(list1, list2);
    } else {
      return findCrossingPointInCircle(list1, list2);
    }
  }
  return null;
}

function mainLine() {
  const list1 = new SinglelyLinkedlist();
  const list2 = new SinglelyLinkedlist();
  const commonList = new SinglelyLinkedlist();

  commonList.append(10);
  commonList.append(11);
  commonList.append(12);

  list1.append(1);
  list1.append(2);
  list1.append(3);
  list2.append(4);
  list2.append(5);
  list2.append(6);
  list1.append(commonList);
  list2.append(commonList);
  console.log(findCrossingPoint(list1, list2));
}

function mainLoop() {
  const list1 = new SinglelyLinkedlist();
  const list2 = new SinglelyLinkedlist();
  const commonList = new SinglelyLinkedListCyclic();
  commonList.append(10);
  commonList.append(11);
  commonList.append(12);


  list1.append(1);
  list1.append(2);
  list1.append(3);
  list1.append(4);
  list1.append(5);
  list2.append(6);
  list2.append(7);
  list2.append(8);
  list1.append(commonList);
  list2.append(commonList);

  console.log(findCrossingPoint(list1, list2));
}

mainLoop();

