// Brute force
// time: O(n^2)
// space: O(n)
const countLongestIncreasingSubsequence = (numbers) => {
  if (numbers.length <= 1) return numbers.length

  const dp = Array(numbers.length).fill(1)
  const len = numbers.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[i] > numbers[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}

const countLongestIncreasingSubsequenceWithMemo = (numbers) => {
  if (numbers.length <= 1) return numbers.length

  const dp = Array(numbers.length).fill(1)
  const len = numbers.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[i] > numbers[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}

const getLongestIncreasingSubsequence = (numbers) => {
  if (numbers.length <= 1) return numbers
  const dp = Array(numbers.length).fill([])
  const len = numbers.length
  for (let i = 0; i < len; i++) {
    dp[i] = [numbers[i]] // dp[i] at least contains numbers[i]
    for (let j = 0; j < i; j++) {
      if (numbers[i] > numbers[j]) {
        if (dp[i].length < dp[j].length + 1) {
          dp[i] = [...dp[j], numbers[i]]
        }
      }
    }
  }
  let longestSubsequence = []
  dp.map((solution) => {
    if (solution.length > longestSubsequence.length) {
      longestSubsequence = solution
    }
  })
  return longestSubsequence
}

const arr = [12, 100, 13, 11, 12, 13]
console.log(countLongestIncreasingSubsequence(arr))
console.log(getLongestIncreasingSubsequence(arr))
