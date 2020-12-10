
const findThreeNumbersByTarget = (nums: number[], target: number): number[][] => {
  const res: number[][] = [];
  const len = nums.length;
  let left = 0;
  let mid = 1;
  let right = 2;

  nums.sort((a, b) => (a - b));

  while (left < len - 2) {
    let sum = nums[left] + nums[mid] + nums[right];

    // Minimum number is still bigger than target
    if (nums[left] > target) {
      break;
    }

    if (sum === target) {
      res.push([nums[left], nums[mid], nums[right]]);
      mid++;
      right = mid + 1;
    }
    else if (sum < target) {
      // right reach the end
      // move the mid
      if (right === len - 1) {
        mid++;
        right = mid + 1;
        continue;
      }

      // mid reach the end
      // move the left
      if (mid === len - 2) {
        left++;
        mid = left + 1;
        right = mid + 1;
      }

      // just move right
      if (right < len - 1 && mid < len - 2) {
        right++;
      }
    }
    else {
      left++;
      mid = left + 1;
      right = mid + 1;
    }
  }

  return res;
}

const nums: number[] = [1, 5, 9, 7, 7, 6, 0];
console.log(findThreeNumbersByTarget(nums, 15));

export { }