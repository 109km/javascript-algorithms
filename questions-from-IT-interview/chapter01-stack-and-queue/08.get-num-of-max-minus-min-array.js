/**
 * @desc
 给定数组arr和整数num，共返回有多少个子数组满足如下情况：
 max（arr[i..j]）-min（arr[i..j]）<=num
 max（arr[i..j]）表示子数组arr[i..j]中的最大值，min（arr[i..j]）表示子数组arr[i..j]中的最小值。
 子数组长度可以为1
 要求：数组长度为n，时间复杂度为O(n)
 */


import DoubleEndedQueue from '../../data-structure/double-ended-queue';

const arr = [2, 5, 4, 3, 4];
const num = 3;

function getSubArrayNum(arr, num) {
  const qmax = new DoubleEndedQueue();
  const qmin = new DoubleEndedQueue();

  const maxLength = arr.length;

  let start = 0,
    end = 0,
    total = 0;

  // Move the array
  while (start < maxLength) {
    while (end < maxLength) {
      // The smaller values' positions will be in the front.
      while (!qmin.isEmpty() && arr[qmin.getLast()] >= arr[end]) {
        qmin.popLast();
      }
      qmin.addLast(end);

      // The larger values' positions will be in the front.
      while (!qmax.isEmpty() && arr[qmax.getLast()] <= arr[end]) {
        qmax.popLast();
      }
      qmax.addLast(end);

      // The first of `qmin` is smallest number in the window
      // The first of `qmax` is largest number in the window
      if (arr[qmax.getFirst()] - arr[qmin.getFirst()] > num) {
        break;
      }
      end++;
    }

    if (qmin.getFirst() === start) {
      qmin.popFirst();
    }
    if (qmax.getFirst() === start) {
      qmax.popFirst();
    }
    total += end - start;
    start++;
  }
  return total;
}

const res = getSubArrayNum(arr, num);
console.log(res);