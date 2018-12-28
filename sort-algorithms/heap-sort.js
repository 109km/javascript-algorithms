function buildMaxHeap(arr) {
  let lastParentNodeIndex;

  // Calculate the last parent node's index.
  lastParentNodeIndex = Math.floor(arr.length / 2) - 1;

  // Heapify starts from the last parent node.
  while (lastParentNodeIndex >= 0) {
    heapify(arr, lastParentNodeIndex, arr.length);
    --lastParentNodeIndex;
  }
}

function heapify(heap, current, max) {
  let maxIndex, leftChild, rightChild;
  while (current < max) {
    maxIndex = current;
    leftChild = 2 * current + 1;
    rightChild = leftChild + 1;

    // Find the max node in the three nodes.
    if (leftChild < max && heap[leftChild] > heap[maxIndex]) {
      maxIndex = leftChild;
    }
    if (rightChild < max && heap[rightChild] > heap[maxIndex]) {
      maxIndex = rightChild;
    }
    // If parent node is the largest number, no more other actions.
    if (maxIndex === current) {
      return;
    }
    // Swap the largest number to the parent node.
    swap(heap, current, maxIndex);
    current = maxIndex;
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
  let lastElement = array.length - 1;

  // Continue heap sorting until we have
  // just one element left in the array.
  while (lastElement >= 0) {

    // Switch the largest number to the array's end.
    swap(array, 0, lastElement);

    // Re-heapify the new heap.
    heapify(array, 0, lastElement);

    // Exclude the ordered numbers.
    --lastElement;
  }
}

let arr = [28, 3, 87, 44, 6];
heapSort(arr, 0, arr.length);
console.log(arr);