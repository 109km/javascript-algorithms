/**
 * @desc

定义二叉树节点如下：
public class Node {
  public int data;
  public Node left;
  public Node right;

  public Node(int data) {
    this.data = data;
  }
}
  一个数组的MaxTree定义如下：
  ● 数组必须没有重复元素。
  ● MaxTree是一棵二叉树，数组的每一个值对应一个二叉树节点。
  ● 包括MaxTree树在内且在其中的每一棵子树上，值最大的节点都是树的头。
  给定一个没有重复元素的数组arr，写出生成这个数组的MaxTree的函数，要求如果数组长度为N，则时间复杂度为O（N）、额外空间复杂度为O（N）。
 */

/**
 * @tips
 以下列原则来建立这棵树：
 ● 每一个数的父节点是它左边第一个比它大的数和它右边第一个比它大的数中，较小的那个。
 ● 如果一个数左边没有比它大的数，右边也没有 ，这个数是整个数组的最大值，那么这个数是MaxTree的头节点。
 */


import Stack from '../data-structure/stack';
import HashMap from '../data-structure/hash-table';

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}



function bulidMaxTree(arr) {
  let root = null;
  function processHashMapAndData(map, key, parent) {
    map.set(key, parent);
  }
  const nodeArr = Array.map(arr, n => {
    return new Node(n);
  });
  const leftStack = new Stack();
  const rightStack = new Stack();
  const leftHashMap = new HashMap();
  const rightHashMap = new HashMap();

  // Loop from left to right, find the first bigger number
  for (let i = 0; i < nodeArr.length; i++) {
    const currentNode = nodeArr[i];
    while (!leftStack.isEmpty() && leftStack.getTop().data < currentNode.data) {
      leftStack.pop();
    }
    if (leftStack.isEmpty()) {
      processHashMapAndData(leftHashMap, currentNode.data, null);
      leftStack.push(currentNode);
      continue;
    }
    if (leftStack.getTop().data > currentNode.data) {
      processHashMapAndData(leftHashMap, currentNode.data, leftStack.getTop());
      leftStack.push(currentNode);
    }
  }
  // Loop from right to left, find the first bigger number
  // And now we know each node's parent, and the root node.
  for (let i = nodeArr.length - 1; i >= 0; i--) {
    const currentNode = nodeArr[i];
    while (!rightStack.isEmpty() && rightStack.getTop().data < currentNode.data) {
      rightStack.pop();
    }
    if (rightStack.isEmpty()) {
      processHashMapAndData(rightHashMap, currentNode.data, null);
      rightStack.push(currentNode);
      continue;
    }
    if (rightStack.getTop().data > currentNode.data) {
      processHashMapAndData(rightHashMap, currentNode.data, rightStack.getTop());
      rightStack.push(currentNode);
      continue;
    }
  }

  // Start to build the tree.
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const leftParent = leftHashMap.get(key);
    const rightParent = rightHashMap.get(key);
    console.log(key, leftParent, rightParent);
    // root node
    if (leftParent === null && rightParent === null) {
      root = nodeArr[i];
      continue;
    }
    if (leftParent === null && rightParent !== null) {
      rightParent.left = nodeArr[i];
      continue;
    }
    if (rightParent === null && leftParent !== null) {
      leftParent.right = nodeArr[i];
      continue;
    }
    if (leftParent.data > rightParent.data) {
      rightParent.left = nodeArr[i];
    }
    if (leftParent.data < rightParent.data) {
      leftParent.right = nodeArr[i];
    }
  }
  return root;
}


const arr = [2, 3, 5, 1, 4];
const root = bulidMaxTree(arr);
console.log('root:', root);