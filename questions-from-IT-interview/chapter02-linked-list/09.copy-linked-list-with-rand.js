/**
 * @description
 * 给定一个由Node节点类型组成的无环单链表的头节点head，
 * 请实现一个函数完成这个链表中所有结构的复制，并返回复制的新链表的头节点。
 * @require
 * 不使用额外的数据结构，只用有限几个变量，且在时间复杂度为O（N）内完成原问题要实现的函数。
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.rand = null;
  }
}

/**
 * @description 
 * This function's time complexity is O(2N),
 * and space complexity is O(N).
 * 
 * @param {Node} head 
 */
import HashMap from '../../data-structure/hash-table';
function copyLinkedListWithHashMap(head) {
  let current = head;
  const map = new HashMap();
  // Record the initial linked list info
  // in the Hash-Map.
  while (current !== null) {
    map.set(current.data, new Node(current.data));
    current = current.next;
  }
  // Build a new linked list based on the info 
  // in the Hash-Map
  current = head;
  while (current !== null) {
    const key = current.data;
    const newNode = map.get(key);
    let newRand = null;
    const currentRand = current.rand;
    if (currentRand !== null) {
      const randKey = map.get(currentRand.data);
      newRand = map.get(randKey);
    }
    newNode.rand = newRand;

    const currentNext = current.next;
    if (currentNext !== null) {
      newNode.next = map.get(current.next.data);
    }
    current = current.next;
  }
  return map.get(head.data);
}

/**
 * @description 
 * This method needs to loop the linked list 3 times,
 * but needs no extra data structure.
 * @param {Node} head
 */
function copyLinkedListWithRand(head) {
  let current = head;
  let copiedCurrent = null;

  // Put the copied nodes to the origin nodes' next.
  while (current !== null) {
    copiedCurrent = new Node(current.data);
    copiedCurrent.next = current.next;
    current.next = copiedCurrent;
    current = copiedCurrent.next;
  }

  // Add rand to copied nodes
  current = head;
  while (current !== null) {
    let currentRand = current.rand;
    copiedCurrent = current.next;
    copiedCurrent.rand = currentRand ? currentRand.next : null;
    current = copiedCurrent.next;
  }

  // Split the copied nodes from the chain
  current = head;
  copiedCurrent = null;
  let newHead = null;
  while (current !== null) {
    if (newHead === null) {
      newHead = head.next;
    }
    copiedCurrent = current.next;
    copiedCurrent.next = current.next.next;
    current.next = current.next.next;
    current = current.next;
  }
  return newHead;
}

// Set rand property to the node
function randomNode(node, originHead) {
  let head = originHead;
  let num = Math.ceil(Math.random() * 15);
  if (num <= 10) {
    for (let i = 0; i < num && head !== null; i++) {
      head = head.next;
    }
    node.rand = head;
  } else {
    node.rand = null;
  }
}

function main() {
  let head = new Node(1);
  const originHead = head;
  for (let i = 2; i < 10; i++) {
    head.next = new Node(i);
    head = head.next;
  }
  head = originHead;
  while (head !== null) {
    randomNode(head, originHead);
    head = head.next;
  }
  console.log(originHead.next);
  const newHead = copyLinkedListWithRand(originHead);
  console.log(newHead.next);
}
main();

