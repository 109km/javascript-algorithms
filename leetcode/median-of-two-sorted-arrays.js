/**
 * 
There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums1
 * @return {number}
 * 
 * @testcase
 * [1,3]
 * [2]
 */
let findMedianSortedArrays = function(nums1, nums2) {
  let combinedArr = [];
  let median;
  while (nums1.length && nums2.length) {
    if (nums1[0] <= nums2[0]) {
      combinedArr.push(nums1.shift());
    } else {
      combinedArr.push(nums2.shift());
    }
  }
  if (nums1.length) {
    combinedArr = combinedArr.concat(nums1);
  }
  if (nums2.length) {
    combinedArr = combinedArr.concat(nums2);
  }

  if (combinedArr.length % 2 === 0) {
    let index = Math.floor(combinedArr.length / 2) - 1;
    median = (combinedArr[index] + combinedArr[index + 1]) / 2;
  } else {
    let index = Math.floor(combinedArr.length / 2);
    median = combinedArr[index];
  }
  return median;
};

console.log(findMedianSortedArrays([1, 3], [2, 4]));