// if target nubmer = m, numbers' length = n
// time: O(n^m * m)
// space:O(2n * m)

const bestSum = (targetNum, numbers, finalTargetNum, bestSolution = null) => {
  if (targetNum < 0) return null
  if (targetNum === 0) return []

  let currentSolution = null
  for (let num of numbers) {
    const newTarget = targetNum - num
    const remainder = bestSum(newTarget, numbers, finalTargetNum, bestSolution)
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

const targetNum = 12
const numbers = [5, 3, 4, 7, 12]
console.log(bestSum(targetNum, numbers, targetNum))
