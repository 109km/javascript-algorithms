/**
 * @description
 * 给定一个链表的头节点head和一个整数num，请实现函数将值为num的节点全部删除。
 * This has already been implemented in the `SinglelyLinkedList` class.
 */

import SinglelyLinkedList from '../../data-structure/singlely-linked-list';

const list = new SinglelyLinkedList();
list.init(1, 10);
list.init(4, 8);
list.remove(4);
