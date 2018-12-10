function insertMineSort(arr) {
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

function insertSortOrigin(arr) {
  let comparingIndex, temp;
  for (let i = 0; i < arr.length; i++) {
    comparingIndex = i;
    for (let j = 0; j < comparingIndex; j++) {
      if (arr[comparingIndex] < arr[j]) {
        temp = arr[j];
        arr[j] = arr[comparingIndex];
        arr[comparingIndex] = temp;
      }
    }
  }
  return arr;
}

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.time('经典插入排序耗时');
console.log(insertSortOrigin(arr));
console.timeEnd('经典插入排序耗时');
console.time('自创插入排序耗时');
console.log(insertMineSort(arr));
console.timeEnd('自创插入排序耗时');