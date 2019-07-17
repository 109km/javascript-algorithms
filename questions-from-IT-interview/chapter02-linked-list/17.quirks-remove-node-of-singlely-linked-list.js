/**
 * @description 
 * 链表节点值类型为int型，给定一个链表中的节点node，
 * 但不给定整个链表的头节点。如何在链表中删除node？
 * 请实现这个函数，并分析这么会出现哪些问题。
 * @requires
 * 要求：时间复杂度为O（1）。
 */

 /**
  * Method 1:
  * If we set next node's `data` to current node,
  * until the last.But we can't remove the last one.
  * But this method is a way of `data` copy, we don't remove 
  * the node actually. If each node represents a server, it will
  * cause huge problems.
  */

 /**
  * Method 2:
  * We set this node's `next` to null.
  * But the linked list will be broken.
  */
