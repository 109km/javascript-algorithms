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
 * if the tree's depth is `h`, then 
 * @param {TreeNode} treeRoot The root of a binary search tree.
 */
function convertSearchBinaryTreeToDoublelyLinkedList(treeRoot) {

  function combineLeftNodes(treeNode) {
    let largestNode = new DoublelyLinkedListNode(treeNode.data);
    if (treeNode.left !== null) {
      largestNode = combineLeftNodes(treeNode.left);
    }
    return largestNode;
  }

  function combineRightNodes(treeNode) {
    let smallestNode = new DoublelyLinkedListNode(treeNode.data);
    if (treeNode.right !== null) {
      smallestNode = combineRightNodes(treeNode.right);
    }
    return smallestNode;
  }

  function combineThree(rootNode) {
    let left = rootNode.left;
    let right = rootNode.right;
    let middleNode = new DoublelyLinkedListNode(rootNode.data);

    let leftLargetst = combineLeftNodes(left);
    let rightSmallest = combineRightNodes(right);
    middleNode.prev = leftLargetst;
    leftLargetst.next = middleNode;
    middleNode.next = rightSmallest;
    rightSmallest.prev = middleNode;
    return middleNode;
  }
  const root = combineThree(treeRoot);
  return root;
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




