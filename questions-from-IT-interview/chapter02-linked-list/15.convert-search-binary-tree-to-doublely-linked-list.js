/**
 * @description
 * 对二叉树的节点来说，有本身的值域，有指向左孩子和右孩子的两个指针；
 * 对双向链表的节点来说，有本身的值域，有指向上一个节点和下一个节点的指针。
 * 在结构上，两种结构有相似性，现在有一棵搜索二叉树，请将其转换为一个有序的双向链表。
 * 
 * 搜索二叉树的特点是：
 * 对于任何一个节点来说左子树的所有节点都比自己小，而右子树上所有节点都比自己大
 */

import { LinkedListNode as DoublelyLinkedListNode } from '../../data-structure/doublely-linked-list';

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
/**
 * @description This method uses the recursive way,
 * if the tree's depth is `h`, then space complexity is O(h),
 * time complexity is O(N)
 * @param {TreeNode} treeRoot The root of a binary search tree.
 */
function convertSearchBinaryTreeToDoublelyLinkedList(treeRoot) {

  function process(head) {
    if (head === null) {
      return null;
    }
    let leftEnd = process(head.left);
    let rightEnd = process(head.right);
    let leftStart = leftEnd !== null ? leftEnd.right : null;
    let rightStart = rightEnd !== null ? rightEnd.right : null;
    if (leftEnd !== null && rightEnd !== null) {
      leftEnd.right = head;
      head.left = leftEnd;
      head.right = rightStart;
      rightStart.left = head;
      rightEnd.right = leftStart;
      return rightEnd;
    } else if (leftEnd !== null) {
      leftEnd.right = head;
      head.left = leftEnd;
      head.right = leftStart;
      return head;
    } else if (rightEnd !== null) {
      head.right = rightStart;
      rightStart.left = head;
      rightEnd.right = head;
      return rightEnd;
    } else {
      head.right = head;
      return head;
    }
  }

  let head = treeRoot;
  if (head === null) {
    return null;
  }
  let last = process(head);
  head = last.right;
  last.right = null;
  return head;
}
function main() {

  // Build a binary search tree
  let current = null;
  const treeRoot = new TreeNode(20);
  current = treeRoot;
  current.left = new TreeNode(10);
  current.right = new TreeNode(30);
  current = current.left;

  current.left = new TreeNode(5);
  current.right = new TreeNode(15);
  current = current.left;
  current.left = new TreeNode(3);
  current.right = new TreeNode(6);

  current = treeRoot.right;
  current.left = new TreeNode(25);
  current.right = new TreeNode(40);

  // Find the `root` node.
  const root = convertSearchBinaryTreeToDoublelyLinkedList(treeRoot);
  console.log(root);
}
main();




