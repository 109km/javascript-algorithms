/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

const isMatch = (s, p) => {
  if (p.length === 0) return s.length === 0
  if (p.length === 1) return s.length === 1 && (s[0] === p[0] || p[0] === '.')

  const matched = s.length > 0 && (s[0] === p[0] || p[0] === '.')

  // Multiple mode
  if (p.length > 1 && p[1] === '*') {
    // Try to skip this pattern (match 0 times)
    if (isMatch(s, p.slice(2))) return true
    // Try to match 1 character each time (match 1 or more times)
    if (matched && isMatch(s.slice(1), p)) return true
    // No match
    return false
  }
  // Single mode
  else {
    return matched && isMatch(s.slice(1), p.slice(1))
  }
}

const isMatchDP = (s, p) => {
  const dp = new Array(s.length + 1)
    .fill(null)
    .map(() => new Array(p.length + 1).fill(false))

  dp[0][0] = true

  for (let j = 2; j <= p.length; j++) {
    dp[0][j] = p[j - 1] == '*' && dp[0][j - 2]
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < p.length; j++) {
      // Match any character
      if (p[j] === '.') {
        dp[i + 1][j + 1] = dp[i][j]
      }
      // Match specific character
      else if (p[j] === '*') {
        dp[i + 1][j + 1] =
          dp[i][j + 1] || (dp[i][j] && (s[i] === p[j - 1] || p[j - 1] === '.'))
      }
      // Match a normal character
      else {
        dp[i + 1][j + 1] = dp[i][j] && s[i] === p[j]
      }
    }
  }
  return dp[s.length][p.length]
}

const isMatch_v2 = (s, p) => {
  if (s === p) return true
  if (p.length === 0 && s.length > 0) return false
  if (s.length === 0) return p === '.' || (p.length === 2 && p[1] === '*')

  const matched = s[0] === p[0] || p[0] === '.'
  if (p.length > 1 && p[1] === '*') {
    return isMatch_v2(s, p.slice(2)) || (matched && isMatch_v2(s.slice(1), p))
  } else {
    return matched && isMatch_v2(s.slice(1), p.slice(1))
  }
}

const testCases = [
  ['', ''],
  ['', 'a*'],
  ['abc', 'a*b*c'],
  ['aa', 'a'],
  ['abcc', 'abc*'],
  ['abcb', 'abc*'],
  ['aqasdfjklbccc', '.*'],
  ['abc', '.*d'],
  ['abcdef', 'ab.*ef'],
  ['aab', 'ac*a*b'],
  ['mississippi', 'mis*is*p*.'],
]
testCases.forEach((testCase) => {
  console.log(isMatch_v2(...testCase))
})
