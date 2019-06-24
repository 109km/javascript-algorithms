/**
 * @desc
 * 一个栈中元素的类型为整型，现在想将该栈从顶到底按从大到小的顺序排序，
 * 只许申请一个栈。除此之外，可以申请新的变量，但不能申请额外的数据结构。如何完成排序？
 */

import Stack from "../data-structure/stack";

function sort(stack) {
  const sortStack = new Stack();

  while (!stack.isEmpty()) {
    let top = stack.pop();
    let sortTop = sortStack.getTop();
    if (sortTop === null) {
      sortStack.push(top);
    } else if (sortTop <= top) {
      sortStack.push(top);
    }
    // 新元素小于已排序栈的栈顶元素
    else {
      while (sortStack.getTop() > top) {
        stack.push(sortStack.pop());
      }
      sortStack.push(top);
    }
  }
  return sortStack;
}

const stack = new Stack();
stack.push(5);
stack.push(6);
stack.push(3);
stack.push(2);

const sortedStack = sort(stack);
console.log(sortedStack);