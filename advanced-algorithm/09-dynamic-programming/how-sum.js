// if m = targetNum and n = arr.length
// time: O(n^m * m)
// space: O(m)
const howSum = (targetNum, arr) => {
  if (targetNum === 0) return [];
  if (targetNum < 0) return null;

  for (let num of arr) {
    const subSolution = howSum(targetNum - num, arr)
    if (subSolution) {

      return [...subSolution, num]
    }
  }
  return null
}

const howSumWithMemo = (targetNum, arr, memo = {}) => {
  if (memo[targetNum]) return memo[targetNum];
  if (targetNum === 0) return [];
  if (targetNum < 0) return null;

  let solution = []
  for (let i in arr) {
    const subSolution = howSumWithMemo(targetNum - arr[i], arr, memo)
    if (subSolution) {
      solution.push(arr[i])
      solution = solution.concat(subSolution)
      memo[targetNum] = solution
      return memo[targetNum]
    }
  }
  return null
}


const targetNum = 7
const arr = [5, 3, 4, 8]
console.log(howSumWithMemo(targetNum, arr))