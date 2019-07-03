/**
 * @description
 * 据说著名犹太历史学家Josephus有过以下故事：在罗马人占领乔塔帕特后，
 * 39个犹太人与Josephus及他的朋友躲到一个洞中，39个犹太人决定宁愿死也不要被敌人抓到，
 * 于是决定了一个自杀方式，41个人排成一个圆圈，由第1个人开始报数，报数到3的人就自杀，
 * 然后再由下一个人重新报1，报数到3的人再自杀，这样依次下去，直到剩下最后一个人时，
 * 那个人可以自由选择自己的命运。这就是著名的约瑟夫问题。
 * 现在请用单向环形链表描述该结构并呈现整个自杀过程。
 * 输入：一个环形单向链表的头节点head和报数的值m。
 * 返回：最后生存下来的节点，且这个节点自己组成环形单向链表，其他节点都删掉。
 * 进阶：如果链表节点数为N，想在时间复杂度为O（N）时完成原问题的要求，该怎么实现？
 */

import CirclelySinglelyLinkedList from '../../data-structure/singlely-linked-list-circle';

function removeOtherNodes(linkList, gapNum) {
  if (gapNum <= 1) {
    throw new TypeError("`gapNum` must be bigger than 1.");
  }
  let currentIndex = 1;
  let current = linkList.head;
  while (linkList.length > 1) {
    // remove this node
    if (currentIndex % gapNum === 0) {
      linkList.remove(current.data);
    }
    currentIndex++;
    current = current.next;
  }
  return linkList.head;
}

function removeOtherNodesInMathematicalWay(linkList, gapNum) {

  function testIsAbleLive(pos, gapNum, totalNumber) {
    let maxSteps = (totalNumber - 1) * gapNum;
    while (true) {
      if (pos % gapNum === 0) {
        return false;
      }
      if (pos > maxSteps) {
        return true;
      }
      pos = pos + totalNumber - Math.floor(pos / gapNum);
    }
  }

  const total = linkList.length;
  let current = linkList.head;
  let currentIndex = 1;

  while (current !== current.next) {
    // Test if this node can survive
    if (testIsAbleLive(currentIndex, gapNum, total)) {
      linkList.head = current;
      linkList.tail = current;
      linkList.head.next = current;
      return linkList;
    } else {
      currentIndex++;
      current = current.next;
    }
  }
}

function simple(linkList, gap) {
  const total = linkList.length;
  const targetPos = (total - 1) * gap - 1;

  // find the target position's original position
  /**
   * 01 02 xx 04 05 xx 07 08 xx 10
   * 11 xx xx 13 14 xx xx 16 xx 17
   * xx xx xx 19 20 xx xx xx xx 22
   * xx xx xx 23 xx xx xx xx xx 25
   * xx xx xx 26 xx xx xx xx xx xx
   * pos - (total - pos / gap) - ( thisLeft - lastLeft)
   * 26 - (10 - 26 / 3) - 1 = 23 
   * 
   * 
   * 01 02 03 xx 05 06 07 xx 09
   * 10 11 xx xx 13 14 15 xx xx
   * 17 18 xx xx 19 xx 21 xx xx
   * 22 23 xx xx xx xx 25 xx xx
   * 26 27 xx xx xx xx xx xx xx
   * 29 30 xx xx xx xx xx xx xx
   * 31 xx
   * 
   * 31 - (9 - 31 / 4) - 0 = 29
   * 29 - (9 - 29 / 4) - 1 = 26
   * 26 - (9 - 26 / 4) - 1 = 22
   * 22 - (9 - 22 / 4 ) - 1 = 17
   * 17 - (9 -  17 / 4) - 2 = 10
   * 10 - (9 - 10 / 4) - 2 = 1
   */

}

function findLastPos(len, gap) {
  if (len === 1) {
    return 1;
  }
  return (findLastPos(len - 1, gap) + gap - 1) % len + 1;
}

function findLastPosMine(pos, total, gap, lastLeft) {
  if (pos < total) {
    return pos;
  }
  const newLeft = total - Math.floor(pos / gap);
  const nextPos = pos - newLeft - (newLeft - lastLeft);
  return findLastPosMine(nextPos, total, gap, newLeft);
}

console.log(findLastPosMine(26, 10, 3, 1));

const list = new CirclelySinglelyLinkedList();
list.init(10);
removeOtherNodesInMathematicalWay(list, 3);
console.log(list.head);


