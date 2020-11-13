
/**
 * 已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */

var arr1 = [
  [4, 2, 2],
  [3, 4, 25, 5],
  [44, 6, 78, 75],
  [6, 7, 1, 9, [
    11, 12, [12, 13, [14, 22, 56, 91, 299]]]],
  10
];

function flat(arr) {
  var flatArr = [];
  arr.forEach(function (item, _) {
    if (Array.isArray(item)) {
      flatArr = flatArr.concat(flat(item));
    } else {
      flatArr.push(item);
    }
  });
  return flatArr;
}

function removeRepeat(arr) {
  var retArr = [];
  var arrRecord = {};
  arr.forEach(function (item, _) {
    if (!arrRecord[item]) {
      arrRecord[item] = 1;
      retArr.push(item);
    }
  });
  return retArr;
}

var n = 0;
function sortAscend(arr) {
  return arr.sort(function (a, b) {
    ++n;
    return a - b;
  });
}

var quickN = 0;
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let midIndex = Math.floor(arr.length / 2);
  let mid = arr.splice(midIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    ++quickN;
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([mid], quickSort(right));
}

var arr2 = flat(arr1);
var arr3 = removeRepeat(arr2);
console.log(sortAscend(arr3));
console.log(quickSort(arr3));
console.log(n, quickN);