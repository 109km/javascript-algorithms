const getLongestIncreasingSubsequence = (numbers) => {
  if (numbers.length === 0) return null
  if (numbers.length === 1) return numbers[0]

  let longestSubsequence = []
  for (let i = 0; i < numbers.length; i++) {
    let start = numbers[i]
    let solution = [start]
    for (let j = i + 1; j < numbers.length; j++) {
      let next = numbers[j]
      if (next > solution[solution.length - 1]) {
        solution.push(next)
      }
    }
    if (solution.length > longestSubsequence.length) {
      longestSubsequence = solution
    }
  }

  return longestSubsequence
}

const arr = [10, 22, 9, 33, 21, 5, 41, 60]
console.log(getLongestIncreasingSubsequence(arr))
