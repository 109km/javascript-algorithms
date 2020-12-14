
const findThreeNumbersByTarget = (nums: number[], target: number): number[][] => {
  const res: number[][] = [];
  const map = new Map();
  const len = nums.length;
  let left = 0;
  let mid = 1;

  // Sort the numbers from min to max
  nums.sort((a, b) => (a - b));

  // Put all nums into a set
  // Time complexity is O(n)
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    if (typeof map.get(num) === 'undefined') {
      map.set(num, [i]);
    } else {
      const indexs = map.get(num);
      indexs.push(i);
      map.set(num, indexs);
    }
  }

  // Find the matched number by moving the two pointers,
  // three numbers' sum can be seen as finding the match number
  // equals target - num1 - num2.
  while (left < len - 2) {
    // Minimum number is still bigger than target
    if (nums[left] > target) {
      break;
    }
    // mid number reach the end
    if (mid === len - 2) {
      left++;
      mid = left + 1;
      continue;
    }

    let lastNum = target - nums[left] - nums[mid];
    const matchedNums: number[] = map.get(lastNum);
    // Can't find the match number,
    // move the pointer.
    if (typeof matchedNums === 'undefined') {
      mid++;
    }
    // find the matched number
    else {
      matchedNums.forEach((matchNum: number) => {
        // Don't add repeated combination
        if (
          left !== matchNum &&
          mid !== matchNum &&
          nums[left] !== nums[left - 1] &&
          nums[mid] !== nums[mid - 1]
        ) {
          const combination = [nums[left], nums[mid], nums[matchNum]];
          res.push(combination);
        }
      });
      mid++;
    }
  }
  return res;
}

const nums: number[] = [1, 0, -1, 5, 9, 7, 7, 6, 0, -1];
console.log(findThreeNumbersByTarget(nums, 15));