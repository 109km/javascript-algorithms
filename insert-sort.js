function insertSort(arr) {
  let orderedArr = [];
  let insertIndex;
  for (let i = 0; i < arr.length; i++) {
    if (orderedArr.length === 0) {
      orderedArr.push(arr[i]);
      continue;
    }
    insertIndex = i;
    for (let j = orderedArr.length; j >= 0; j--) {
      if (arr[i] < orderedArr[j]) {
        insertIndex = j;
      }
    }
    orderedArr.splice(insertIndex, 0, arr[i]);
  }
  return orderedArr;
}

let arr = [29, 17, 4, 99, 100, 289, 201];
console.time('插入排序耗时');
console.log(insertSort(arr));
console.timeEnd('插入排序耗时');