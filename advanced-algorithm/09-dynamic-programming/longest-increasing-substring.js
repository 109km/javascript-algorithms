const getLongestIncreasingSubsequence = (numbers, longestSubsequence = []) => {
  if (numbers.length === 0) return null
  if (numbers.length === 1) return numbers[0]
}

const arr = [10, 22, 9, 33, 21, 5, 41, 60]
console.log(getLongestIncreasingSubsequence(arr))
