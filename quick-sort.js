function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let midIndex = Math.floor(arr.length / 2);
  let mid = arr.splice(midIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([mid], quickSort(right));
}
let arr = [30, 5, 10, 9, 48, 299, 70, 1, 66, 8];
console.log(quickSort(arr));