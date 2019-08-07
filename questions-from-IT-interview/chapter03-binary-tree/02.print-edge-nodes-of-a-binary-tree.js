/**
 * @description
 * 
  给定一棵二叉树的头节点head，按照如下两种标准分别实现二叉树边界节点的逆时针打印。
  标准一：
  1. 头节点为边界节点。
  2. 叶节点为边界节点。
  3. 如果节点在其所在的层中是最左或最右的，那么也是边界节点。

  标准二：
  1. 头节点为边界节点。
  2. 叶节点为边界节点。
  3. 树左边界延伸下去的路径为边界节点。
  4. 树右边界延伸下去的路径为边界节点。
 */


import Node from '../../data-structure/binary-tree-node';

function printEdgeNodesByMethod1(root) {

  // Get the height of this tree.
  function getHeight(node, depth) {
    if (node === null) {
      return depth;
    }
    return Math.max(getHeight(node.left, depth + 1), getHeight(node.right, depth + 1));
  }
  // Put the left edges and right edges in this map.
  // This array's structure is like below, each height has two edges at most(except root node):
  // [ [leftEdge1,rightEdge1] , [leftEdge2,rightEdge2] ]
  function setEdgeMap(node, depth, edgeMap) {
    if (node === null) {
      return;
    }
    edgeMap[depth][0] = edgeMap[depth][0] === null ? node : edgeMap[depth][0];
    edgeMap[depth][1] = node;
    setEdgeMap(node.left, depth + 1, edgeMap);
    setEdgeMap(node.right, depth + 1, edgeMap);
  }
  function printLeafNotInMap(node, depth, edgeMap) {
    if (node === null) {
      return;
    }
    if (
      node.left === null &&
      node.right === null &&
      node !== edgeMap[depth][0] &&
      node !== edgeMap[depth][1]
    ) {
      console.log(node.data);
    }
    printLeafNotInMap(node.left, depth + 1, edgeMap);
    printLeafNotInMap(node.right, depth + 1, edgeMap);
  }

  if (root === null) {
    return;
  }
  const height = getHeight(root, 0);
  const edgeMap = Array.from({ length: height }, function () {
    return [null, null]
  });
  setEdgeMap(root, 0, edgeMap);
  // Print left edge nodes
  for (let i = 0; i < edgeMap.length; i++) {
    console.log(edgeMap[i][0].data);
  }
  // Print the nodes which are not left edges nor right edges.
  printLeafNotInMap(root, 0, edgeMap);
  // Print right edge nodes
  for (let i = edgeMap.length - 1; i >= 0; i--) {
    if (edgeMap[i][0] !== edgeMap[i][1]) {
      console.log(edgeMap[i][1].data);
    }
  }
}

function printLeftEdge(node, isPrint) {
  if (node === null) {
    return;
  }
  if (isPrint || (node.left === null && node.right === null)) {
    console.log(node.data);
  }
  printLeftEdge(node.left, isPrint);
  printLeftEdge(node.right, isPrint && node.left === null ? true : false);
}
function printRightEdge(node, isPrint) {
  if (node === null) {
    return;
  }
  printRightEdge(node.left, isPrint && node.right === null ? true : false);
  printRightEdge(node.right, isPrint);
  if (isPrint || (node.left === null && node.right === null)) {
    console.log(node.data);
  }
}

function printEdgeNodesByMethod2(root) {
  if (root === null) {
    return;
  }
  // Print root node
  console.log(root.data);
  if (root.left !== null && root.right !== null) {
    printLeftEdge(root.left, true);
    printRightEdge(root.right, true);
  } else {
    printEdgeNodesByMethod2(root.left !== null ? root.left : root.right);
  }
}

/**
 *     10
 *    /  \
 *   5   15
 *  /\   / \
 * 3 6  12 28 
 *   \  /
 *   7 11
 *     /\
 *    9 13
 */
function main() {
  const root = new Node(10);
  root.addLeft(5).addRight(15);
  root.left.addLeft(3).addRight(6);
  root.left.right.addLeft(7);
  root.right.addLeft(12).addRight(28);
  root.right.left.addLeft(11);
  root.right.left.left.addLeft(9).addRight(13);

  console.log('Method1:');
  printEdgeNodesByMethod1(root);
  console.log('Method2:');
  printEdgeNodesByMethod2(root);
}

main();