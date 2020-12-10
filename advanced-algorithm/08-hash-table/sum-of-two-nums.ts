
/**
 * Here is an prerequisite:
 * Each number in `nums` are unique.
*/
const findTwoNumbersByTarget = (nums: number[], target: number): number[] => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    map.set(num, i);
    const d = target - num;
    if (map.has(d)) {
      return [i, map.get(d)];
    }
  }
  return null;
}

const nums = [1, 6, 9, 5];
const target = 14;

console.log(findTwoNumbersByTarget(nums, target)); // [3,2]

export { }