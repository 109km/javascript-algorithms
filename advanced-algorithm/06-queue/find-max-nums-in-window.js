const { Dequeue } = require("./queue");

function getMaxSlidingWindow(nums, k) {
  const result = [];
  let start = 0;
  while (start + k < nums.length) {
    let currentMax = 0;
    // Check each number in the window
    for (let i = 0; i < k; i++) {
      let num = nums[start + i];
      if (num > currentMax) {
        currentMax = num;
      }
    }
    result.push(currentMax);
    start++;
  }
  return result;
}

function getMaxSlidingWindow_V2(nums, k) {
  const result = [];
  const maxQueue = new Dequeue();
  for (let i = 0; i < nums.length; i++) {

    // Remove the element out of the window
    if (i - maxQueue.front() + 1 > k) {
      maxQueue.removeFront();
    }

    // Remove all the smaller nums
    // Tip: Each element can `enqueue` once and `dequeue` once,
    // and all the elements' times of operations are maximum 2n,
    // so this algorithm's time complexity is O(n)
    while (nums[maxQueue.elements[maxQueue.size - 1]] <= nums[i]) {
      maxQueue.removeEnd();
    }

    // Add the larger num into the end.
    maxQueue.addEnd(i);

    // Add the max num into result
    if (i + 1 >= k) {
      result.push(nums[maxQueue.front()]);
    }
  }
  return result;
}

const k = 3;
const nums = [1, 4, 3, 5, 2, 6, 2, 3, 1];

// console.log(getMaxSlidingWindow(nums, k));
console.log(getMaxSlidingWindow_V2(nums, k));