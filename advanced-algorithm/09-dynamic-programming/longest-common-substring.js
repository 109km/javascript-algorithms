/**
 *
 * @param {String} text1
 * @param {String} text2
 * @returns {Number} The length of the longest common subsequence
 */

const longestCommonSubsequence = (text1, text2) => {
  const m = text1.length
  const n = text2.length
  const dp = Array(m + 1).fill(Array(n + 1).fill(0))
  // Here use the top-down approach
  // This approch's key point is that we use the
  // previous result to calculate the current result
  // Time complexity: O(m * n)
  // Space complexity: O(m * n)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (text1[i] === text2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j])
      }
    }
  }
  return dp[m][n]
}

const testMethod = longestCommonSubsequence
function testCase1() {
  const text1 = 'a'
  const text2 = 'abcabcba'
  console.log(testMethod(text1, text2))
}

function testCase2() {
  const text1 = 'bsbininm'
  const text2 = 'jmjkbkjkv'
  console.log(testMethod(text1, text2))
}

testCase1()
// testCase2()
