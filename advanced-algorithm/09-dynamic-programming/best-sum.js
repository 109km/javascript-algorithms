// if target nubmer = m, numbers' length = n
// time: O(n^m * m)
// space:O(2n * m)

// With memoization vs without memoization
// The result is amazing.
let count = 0
let memoCount = 0

const bestSum = (targetNum, numbers) => {
  const recurse = (targetNum, numbers, finalTargetNum, bestSolution = null) => {
    if (targetNum < 0) return null
    if (targetNum === 0) return []
    count++

    let currentSolution = null
    for (let num of numbers) {
      const newTarget = targetNum - num
      const remainder = recurse(
        newTarget,
        numbers,
        finalTargetNum,
        bestSolution,
      )
      if (remainder) {
        currentSolution = [num, ...remainder]
        // if is the root node
        if (newTarget + num === finalTargetNum) {
          if (!bestSolution || bestSolution.length > currentSolution.length) {
            bestSolution = currentSolution
          }
        }
      }
    }
    return currentSolution
  }

  return recurse(targetNum, numbers, targetNum)
}

// time : O(n * m^2)
// space: O(m^2)
const bestSumWithMemo = (targetNum, numbers) => {
  const recurse = (
    targetNum,
    numbers,
    finalTargetNum,
    bestSolution = null,
    memo = {},
  ) => {
    if (memo[targetNum]) return memo[targetNum]
    if (targetNum < 0) return null
    if (targetNum === 0) return []
    memoCount++

    let currentSolution = null
    for (let num of numbers) {
      const newTarget = targetNum - num
      const remainder = recurse(
        newTarget,
        numbers,
        finalTargetNum,
        bestSolution,
        memo,
      )
      if (remainder) {
        currentSolution = [num, ...remainder]
        // if is the root node
        if (newTarget + num === finalTargetNum) {
          if (!bestSolution || bestSolution.length > currentSolution.length) {
            bestSolution = currentSolution
          }
        }
      }
    }
    memo[targetNum] = currentSolution
    return currentSolution
  }

  return recurse(targetNum, numbers, targetNum)
}

const targetNum = 53
const numbers = [5, 3, 4, 7, 12]
console.log(bestSum(targetNum, numbers, targetNum), count)
console.log(bestSumWithMemo(targetNum, numbers, targetNum), memoCount)
