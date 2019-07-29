/**
 * @description
 * 用递归和非递归方式，分别按照二叉树先序、中序和后序打印所有的节点。
 * 我们约定：先序遍历顺序为根、左、右；中序遍历顺序为左、根、右；后序遍历顺序为左、右、根。
 */

import Stack from '../../data-structure/stack';
import Node from '../../data-structure/binary-tree-node';

function traverseBinaryTreeByOrder(root, order) {
  if (root === null) {
    return;
  }
  if (order === 'pre') {
    console.log(root.data);
  }
  traverseBinaryTreeByOrder(root.left, order);
  if (order === 'in') {
    console.log(root.data);
  }
  traverseBinaryTreeByOrder(root.right, order);
  if (order === 'post') {
    console.log(root.data);
  }
}

function traverseBinaryTreeByOrderWithStack(root, order) {
  const stack = new Stack();
  const initRoot = root;
  let current = initRoot;

  if (order === 'pre') {
    stack.push(current);
    while (!stack.isEmpty()) {
      let cur = stack.pop();
      console.log(cur.data);
      if (cur.right !== null) {
        stack.push(cur.right);
      }
      if (cur.left !== null) {
        stack.push(cur.left);
      }
    }
  }

  if (order === 'in') {
    const loopLeft = (current) => {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
    }
    loopLeft(current);
    while (!stack.isEmpty()) {
      current = stack.pop();
      if (current.right !== null) {
        loopLeft(current.right);
      } else {
        console.log(current.data);
      }
    }
  }

  if (order === 'post') {
    let top = null, out = initRoot;
    stack.push(initRoot);
    while (!stack.isEmpty()) {
      top = stack.getTop();
      if (top.left !== null && out !== top.left && out !== top.right) {
        stack.push(top.left);
      } else if (top.right !== null && out !== top.right) {
        stack.push(top.right);
      } else {
        out = stack.pop();
        console.log(out.data);
      }
    }
  }

}

/**
 *    10
 *    /\
 *   5  15
 *  /\  / \
 * 3 6 12 28 
 */
function main() {
  const root = new Node(10);
  root.addLeft(5).addRight(15);
  root.left.addLeft(3).addRight(6);
  root.right.addLeft(12).addRight(28);
  // traverseBinaryTreeByOrder(root, 'post');
  traverseBinaryTreeByOrderWithStack(root, 'post');
}

main();