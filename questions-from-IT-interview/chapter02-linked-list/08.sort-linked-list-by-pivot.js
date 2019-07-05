/**
 * @desc
 * 给定一个单向链表的头节点head，节点的值类型是整型，再给定一个整数pivot。
 * 实现一个调整链表的函数，将链表调整为左部分都是值小于pivot的节点，
 * 中间部分都是值等于pivot的节点，右部分都是值大于pivot的节点。
 * 在左、中、右三个部分的内部也做顺序要求，要求每部分里的节点从左到右的顺序与原链表中节点的先后次序一致。
 * 如果链表长度为N，时间复杂度请达到O（N），额外空间复杂度请达到O（1）。
 */


/**
 * @desc 
 * 最简单，但是最空间复杂度高的方法：
 * 用队列，时间复杂度为 O(2N)，空间复杂度为O(N)
 */
import Queue from '../../data-structure/queue';
import SinglelyLinkedList from '../../data-structure/singlely-linked-list';

function sortLinkedListByPivot(linkedList, pivot) {
  const queueSmall = new Queue();
  const queueEqual = new Queue();
  const queueLarge = new Queue();
  let current = linkedList.head;
  while (current !== null) {
    if (current.data < pivot) {
      queueSmall.enQueue(current.data);
    }
    if (current.data === pivot) {
      queueEqual.enQueue(current.data);
    }
    if (current.data > pivot) {
      queueLarge.enQueue(current.data);
    }
    current = current.next;
  }

  linkedList.head = null;
  linkedList.tail = null;
  while (!queueSmall.isEmpty()) {
    linkedList.append(queueSmall.deQueue());
  }
  while (!queueEqual.isEmpty()) {
    linkedList.append(queueEqual.deQueue());
  }
  while (!queueLarge.isEmpty()) {
    linkedList.append(queueLarge.deQueue());
  }

}

/**
 * @description
 * 把一个链表拆分成三个，然后拆分出来的链表记录头部和尾部信息，
 * 在循环过程中分别改变这三个链表的头尾信息，最后把三个链条再连接起来，
 * 只循环一次时间复杂度为O(N)，固定增加6个变量空间复杂度为O(1)
 */

function sortLinkedListByPivotV2(linkedList, pivot) {
  let smallHead = null;
  let equalHead = null;
  let largeHead = null;
  let smallTail = null;
  let equalTail = null;
  let largeTail = null;
  let current = linkedList.head;

  while (current !== null) {
    if (current.data < pivot) {
      if (smallHead === null) {
        smallHead = current;
        smallTail = current;
      } else {
        smallTail.next = current;
        smallTail = current;
      }
    }
    if (current.data === pivot) {
      if (equalHead === null) {
        equalHead = current;
        equalTail = current;
      } else {
        equalTail.next = current;
        equalTail = current;
      }
    }
    if (current.data > pivot) {
      if (largeHead === null) {
        largeHead = current;
        largeTail = current;
      } else {
        largeTail.next = current;
        largeTail = current;
      }
    }
    current = current.next;
  }

  let newHead = null;
  let newTail = null;
  if (smallTail !== null) {
    newHead = smallHead;
    newTail = smallTail;
    newTail.next = null;
  }
  if (equalTail !== null) {
    if (newHead !== null) {
      newTail.next = equalHead;
      newTail = equalTail;
      newTail.next = null;
    } else {
      newHead = equalHead;
      newTail = equalTail;
      newTail.next = null;
    }
  }
  if (largeTail !== null) {
    if (newHead !== null) {
      newTail.next = largeHead;
      newTail = largeTail;
      newTail.next = null;
    } else {
      newHead = largeHead;
      newTail = largeTail;
      newTail.next = null;
    }
  }
  return newHead;
}


const list = new SinglelyLinkedList();
list.append(3);
list.append(2);
list.append(1);
list.append(5);
list.append(4);

// sortLinkedListByPivot(list, 3);

const newHead = sortLinkedListByPivotV2(list, 3);
console.log(newHead.next.next);
