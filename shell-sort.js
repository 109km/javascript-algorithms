function shellSort(arr) {
  let len = arr.length,
    temp,
    gap = Math.floor(len / 2);
  for (; gap > 0; gap = Math.floor(gap / 2)) { // 分组
    // 分组中执行插入排序
    for (let i = 0; i < len; i += gap) {
      let comparingIndex = i;
      for (let j = 0; j < comparingIndex; j += gap) {
        if (arr[comparingIndex] < arr[j]) {
          temp = arr[comparingIndex];
          arr[comparingIndex] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
  return arr;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.time('希尔排序耗时');
console.log(shellSort(arr));
console.timeEnd('希尔排序耗时');