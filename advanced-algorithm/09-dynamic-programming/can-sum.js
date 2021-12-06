// Given a target number and an array of numbers,
// check if there is a solution that the numbers in the array's sum is target number.
// And numbers in the array can be used repeatedly

const canSumIteration = (targetNum, arr, memo = {}) => {
  if (targetNum in memo) return memo[targetNum]
  if (targetNum < 0) return false
  if (targetNum === 0) return true

  for (let i in arr) {
    const leftNum = targetNum - arr[i]
    if (canSumIteration(leftNum, arr, memo)) {
      memo[targetNum] = true
      return true
    }
  }
  memo[targetNum] = false
  return false
}

const canSumRecursionWithMemo = (targetNum, arr, memo = {}) => {
  if (targetNum in memo) return memo[targetNum]
  if (targetNum < 0) return false
  if (targetNum === 0) return true
  memo[targetNum] = arr.some(ele => {
    return canSumRecursion(targetNum - ele, arr, memo)
  })
  return memo[targetNum]
}

const canSumRecursion = (targetNum, arr) => {
  if (targetNum < 0) return false
  if (targetNum === 0) return true
  return arr.some(ele => {
    return canSumRecursion(targetNum - ele, arr)
  })
}

const targetNum = 3557
const arr = [6, 8, 37]

console.log(canSumIteration(targetNum, arr))
// console.log(canSumRecursion(targetNum, arr))