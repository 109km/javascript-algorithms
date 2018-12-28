/** 
 * @desc 
 * Split the array in two : log n
 * Compare two numbers : n / 2
 * Final time complexity n * log n
*/

function compareAndConcat(left, right) {
  let concatArray = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      concatArray.push(left.shift());
    } else {
      concatArray.push(right.shift());
    }
  }
  if (left.length) {
    concatArray = concatArray.concat(left);
  }
  if (right.length) {
    concatArray = concatArray.concat(right);
  }
  return concatArray;
}

function mergeAndSort(arr) {
  let len = arr.length;
  if (len === 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, len);
  return compareAndConcat(mergeAndSort(left), mergeAndSort(right));
}

let arr = [19, 8, 5, 4, 17];

console.log(mergeAndSort(arr));
