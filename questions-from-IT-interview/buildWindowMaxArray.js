/**
 * @description
 * 
  有一个整型数组arr和一个大小为w的窗口从数组的最左边滑到最右边，窗口每次向右边滑一个位置。
  例如，数组为[4，3，5，4，3，3，6，7]，窗口大小为3时：
  [4  3  5] 4  3  3  6  7             窗口中最大值为5
  4 [3  5  4] 3  3  6  7              窗口中最大值为5
  4  3 [5  4  3] 3  6  7              窗口中最大值为5
  4  3  5 [4  3  3] 6  7              窗口中最大值为4
  4  3  5  4 [3  3  6] 7              窗口中最大值为6
  4  3  5  4  3 [3  6  7]             窗口中最大值为7
  如果数组长度为n，窗口大小为w，则一共产生n-w+1个窗口的最大值
  请实现一个函数。
  ● 输入：整型数组arr，窗口大小为w。
  ● 输出：一个长度为n-w+1的数组res，res[i]表示每一种窗口状态下的最大值。
  以本题为例，结果应该返回{5，5，5，4，6，7}。
 */

function findMaxInArray(arr) {
  let max = null;
  let len = arr.length;
  let i = 0;
  while (i < len) {
    if (arr[i] > max || max === null) {
      max = arr[i];
    }
    i++;
  }
  return max;
}
function getMaxWinowArray(arr, w) {
  const winArray = [];

  let pointer = 0;
  while (pointer <= arr.length - w ) {
    console.log(arr.slice(pointer, pointer + w));
    const max = findMaxInArray(arr.slice(pointer, pointer + w));
    winArray.push(max);
    pointer++;
  }
  return winArray;
}


const arr = [3,5,10,5,6,8,9];
const w = 3;
const res = getMaxWinowArray(arr,w);
console.log(res);