/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 *
 */
const isMatch = (s, p) => {
  if (p.length === 0) return s.length === 0
  if (p.length === 1) return s.length === 1 && (s[0] === p[0] || p[0] === '.')

  const matched = s.length > 0 && (s[0] === p[0] || p[0] === '.')
  if (p.length > 1 && p[1] === '*') {
    return isMatch(s, p.slice(2)) || (matched && isMatch(s.slice(1), p))
  } else {
    return matched && isMatch(s.slice(1), p.slice(1))
  }
}

const testCases = [
  // ['', ''],
  // ['', '*'],
  // ['', 'a*'],
  // ['abc', 'a*b*c'],
  // ['abcc', 'abc*'],
  // ['abcb', 'abc*'],
  // ['aqasdfjklbccc', '.*'],
  ['abc', '.*d'],
  // ['abcdef', 'ab.*ef'],
]
testCases.forEach((testCase) => {
  console.log(isMatch(...testCase))
})
