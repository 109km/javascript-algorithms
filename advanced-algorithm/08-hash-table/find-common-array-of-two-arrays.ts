/**
 * Use an `object` as a hash table.
 **/

const findCommonArray = (nums1: number[], nums2: number[]): number[] => {
  const map: object = {};
  const res: number[] = [];
  nums1.forEach((num, index) => {
    map[num] = 1;
  });
  nums2.forEach((num, index) => {
    if (map[num] === 1) {
      res.push(num);
      // This number is consumed.
      map[num] = 0;
    }
  });
  return res;
}

const nums1 = [1, 1, 1, 5, 2, 4, 9];
const nums2 = [5, 8, 5, 9, 1, 1];
console.log(findCommonArray(nums1, nums2));