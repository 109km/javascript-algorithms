function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

let arr = [100, 29, 19, 300, 18, 29, 9, 2, 17];
console.time('冒泡排序耗时');
console.log(bubbleSort(arr));
console.timeEnd('冒泡排序耗时');