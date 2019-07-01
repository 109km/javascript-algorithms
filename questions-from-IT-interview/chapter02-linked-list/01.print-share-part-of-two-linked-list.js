/**
 * @desc
 * 给定两个有序链表的头指针head1和head2，打印两个链表的公共部分。
 */

import SinglelyLinkedList from '../../data-structure/singlely-linked-list';

const list1 = new SinglelyLinkedList();
const list2 = new SinglelyLinkedList();

for (let i = 0; i < 10; i++) {
  list1.append(i);
}
for (let i = 5; i < 15; i++) {
  list2.append(i);
}

function compareCommonPart(list1, list2) {

  const result = [];
  let head1 = list1.head;
  let head2 = list2.head;

  while (head1 !== null && head2 !== null) {
    if (head1.data === head2.data) {
      result.push(head1.data);
      head1 = head1.next;
      head2 = head2.next;
    } else if (head1.data < head2.data) {
      head1 = head1.next;
    } else if (head1.data > head2.data) {
      head2 = head2.next;
    }
  }
  return result;

}

const res = compareCommonPart(list1, list2);
console.log(res);