/**
 * @description
 * 假设链表中每一个节点的值都在0～9之间，那么链表整体就可以代表一个整数。
 * 例如：9->3->7，可以代表整数937。
 * 给定两个这种链表的头节点head1和head2，请生成代表两个整数相加值的结果链表。
 */

/**
 * @description
 * 1. Loop the two linked list.
 * 2. Save each node into the stacks.
 * 3. Build the result's linked list.
 * Time complexity is O(2*(M+N)), space complexity is O(M+N)
 */
import SinglelyLinkedList from '../../data-structure/singlely-linked-list';
import Stack from '../../data-structure/stack';
function addTwoLinkedList(list1, list2) {
  let current1 = list1.head;
  const stack1 = new Stack();
  while (current1 !== null) {
    stack1.push(current1);
    current1 = current1.next;
  }

  let current2 = list2.head;
  const stack2 = new Stack();
  while (current2 !== null) {
    stack2.push(current2);
    current2 = current2.next;
  }

  const resultList = new SinglelyLinkedList();
  let carryBit = 0; // Carry bit
  let add1 = 0;
  let add2 = 0;
  const maxLen = stack1 > stack2 ? stack1.length : stack2.length;
  for (let i = 0; i <= maxLen; i++) {
    add1 = stack1.getTop() !== null ? stack1.pop().data : 0;
    add2 = stack2.getTop() !== null ? stack2.pop().data : 0;
    let res = add1 + add2 + carryBit;
    if (res >= 10) {
      carryBit = 1;
      res = res - 10;
    }
    resultList.prepend(res);
  }
  return resultList;
}


/**
 * @description
 * 1. Reverse the two linked list.
 * 2. Loop the linked lists together.
 * Time complexity is O(2*(M+N))
 */
function addTwoLinkedListWithoutStack(list1, list2) {

  const resultList = new SinglelyLinkedList();
  // Reverse the two linked list.
  list1.reverse();
  list2.reverse();

  const maxLen = list1.length > list2.length ? list1.length : list2.length;
  let head1 = list1.head;
  let head2 = list2.head;
  let add1 = 0;
  let add2 = 0;
  let carryBit = 0;
  for (let i = 0; i <= maxLen; i++) {

    if (head1 !== null) {
      add1 = head1.data;
      head1 = head1.next;
    } else {
      add1 = 0;
    }
    if (head2 !== null) {
      add2 = head2.data;
      head2 = head2.next;
    } else {
      add2 = 0;
    }

    let res = add1 + add2 + carryBit;
    if (res >= 10) {
      carryBit = 1;
      res = res - 10;
    }
    resultList.prepend(res);
  }
  return resultList;
}




function main() {
  const num1 = new SinglelyLinkedList();
  num1.append(8);
  num1.append(7);
  num1.append(2);

  const num2 = new SinglelyLinkedList();
  num2.append(5);
  num2.append(3);
  num2.append(1);

  const res1 = addTwoLinkedList(num1, num2);
  const res2 = addTwoLinkedListWithoutStack(num1, num2);
  console.log(res1, res2);
}

main();