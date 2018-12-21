let i = 0;

function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, len);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];

  // Sort the two arrays
  // The minimum number comes first
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    }
    if (right[0] <= left[0]) {
      result.push(right.shift());
    }
  }
  if (left.length) {
    result = result.concat(left);
  }
  if (right.length) {
    result = result.concat(right);
  }
  // console.log(result);
  return result;
}

let arr = [80, 42, 85, 19, 27];
let sortedArr = mergeSort(arr);
console.log(sortedArr);