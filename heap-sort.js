function buildMaxHeap(arr) {
  let i;
  i = Math.floor(arr.length / 2) - 1;
  while (i >= 0) {
    heapify(arr, i, arr.length);
    --i;
  }
  return arr;
}

function heapify(heap, i, max) {
  let index, leftChild, rightChild;
  while (i < max) {
    index = i;
    leftChild = 2 * i + 1;
    rightChild = 2 * (i + 1);

    if (leftChild < max && heap[leftChild] > heap[index]) {
      index = leftChild;
    }
    if (rightChild < max && heap[rightChild] > heap[index]) {
      index = rightChild;
    }
    if (index === i) {
      return;
    }
    swap(heap, i, index);
    i = index;
  }
}

function swap(arr, firstIndex, lastIndex) {
  let temp;
  temp = arr[firstIndex];
  arr[firstIndex] = arr[lastIndex];
  arr[lastIndex] = temp;
}

function heapSort(array) {
  // Build our max heap.
  buildMaxHeap(array);

  // Find last element.
  lastElement = array.length - 1;

  // Continue heap sorting until we have
  // just one element left in the array.
  while (lastElement > 0) {
    swap(array, 0, lastElement);

    heapify(array, 0, lastElement);

    lastElement -= 1
  }
  return array;
}

let arr = [28, 3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48, 666];
console.log(heapSort(arr));