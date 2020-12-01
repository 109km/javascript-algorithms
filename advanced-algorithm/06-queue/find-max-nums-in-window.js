function findMaxNumbersInWindow(nums, k) {
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

console.log(findMaxNumbersInWindow([1, 4, 3, 5, 2, 6, 2, 3, 1], 3));