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

/**
 * @desc This method's complexity is O(m*n)
 * @param {CirclelySinglelyLinkedList} linkList 
 * @param {Number} gapNum 
 */
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

/**
 * @desc This method's complexity is still O(m * n)
 * @param {CirclelySinglelyLinkedList} linkList 
 * @param {Number} gapNum 
 */
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
/**
 * @desc This method is from the book.
 * It's complexity is O(n).
 * And I can't understand this train of thought.
 * @param {Number} len 
 * @param {Number} gap 
 */
function findLastPos(len, gap) {
  if (len === 1) {
    return 1;
  }
  // This is not tail recursion, costs too much memory.
  return (findLastPos(len - 1, gap) + gap - 1) % len + 1;
}


/**
 * @desc len = 10 gap = 3
 * 01 02 xx 04 05 xx 07 08 xx 10
 * 11 xx xx 13 14 xx xx 16 xx 17
 * xx xx xx 19 20 xx xx xx xx 22
 * xx xx xx 23 xx xx xx xx xx 25
 * xx xx xx 26 xx xx xx xx xx xx
 * xx xx xx 28 xx xx xx xx xx xx
 * 
 * @desc len = 9 gap = 4
 * 01 02 03 xx 05 06 07 xx 09
 * 10 11 xx xx 13 14 15 xx xx
 * 17 18 xx xx 19 xx 21 xx xx
 * 22 23 xx xx xx xx 25 xx xx
 * 26 27 xx xx xx xx xx xx xx
 * 29 30 xx xx xx xx xx xx xx
 * 31 xx
 */


/**
 * @desc This method is created by me.
 * The core idea is from the graph above:
 * we can calculate that the final step is `(len-1) * gap + 1` ,
 * so now our target is finding the initial number 
 * based on the number of last step. 
 * In the first example last step is 28. And initial number is 4.
 * The pattern of step number is:
 * `NextStepNumber = LastStepNumber + CountOfLeftNumberUntilLastStepNumber`
 * Let's see the example again:
 * `28 = 26 + (10 - Int(26 / 3))`
 * The count of left numbers till 26 is 2, becasue we remove a number every 3 steps.
 * So until 26 we have already removed `Int(26 / 3) = 8` numbers.
 * According to the pattern above, we can use a recursive way to calculate the initial
 * number directly.
 * 
 * @param {Number} pos 
 * @param {Number} total 
 * @param {Number} gap 
 * @param {Number} lastLeft 
 */
function findPrevPos(pos, total, gap, lastLeft) {
  if (pos < total) {
    return pos;
  }
  const prevPos = pos - lastLeft;
  const prevLeft = total - Math.floor(prevPos / gap);
  // This is a tail recursion, costs only one stack-frame.
  return findPrevPos(prevPos, total, gap, prevLeft);
}

console.log(findPrevPos(28, 10, 3, 2));

const list = new CirclelySinglelyLinkedList();
list.init(1, 10);
removeOtherNodesInMathematicalWay(list, 3);
console.log(list.head);




