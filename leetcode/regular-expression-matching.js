/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 *
 * abc,a*,bc
 * bc,a*,bc
 * bc,bc,''
 * '','',''
 */
const isMatch = (s, p) => {
  const AnyMark = '.'
  const StarMark = '*'

  if (s === '' && p === '') {
    return true
  }
  if (s !== '' && p === '') {
    return false
  }
  // Single star is not allowed
  if (p === StarMark) {
    return false
  }

  const match = (char, pattern) => {
    if (pattern === AnyMark) {
      return true
    } else if (char === pattern) {
      return true
    } else {
      return false
    }
  }
  const getNextPattern = ((pattern) => {
    let index = 0
    const len = pattern.length

    return () => {
      if (index === len) {
        return null
      }
      const char = pattern[index]
      if (index + 1 <= len && pattern[index + 1] === StarMark) {
        index += 2
        return {
          char,
          range: [0, Infinity],
        }
      }
      index++
      return {
        char,
        range: [1, 1],
      }
    }
  })(p)

  let i = 0
  let currentPattern = getNextPattern()
  let matchedNumer = 1
  while (i < s.length && currentPattern !== null) {
    let char = s[i]

    // Ignore this pattern and get next pattern
    if (!match(char, currentPattern.char) && currentPattern.range[0] === 0) {
      currentPattern = getNextPattern()
      if (currentPattern === null) {
        return false
      }
      matchedNumer = 1
      continue
    }

    // Match this pattern and reach the max range
    if (
      match(char, currentPattern.char) &&
      matchedNumer === currentPattern.range[1]
    ) {
      i++
      currentPattern = getNextPattern()
      matchedNumer = 1
      continue
    }

    // Match this pattern and match number is in range
    if (
      match(char, currentPattern.char) &&
      matchedNumer >= currentPattern.range[0] &&
      matchedNumer < currentPattern.range[1]
    ) {
      i++
      matchedNumer++
      continue
    }

    // Match this pattern and match number is out of range
    if (
      match(char, currentPattern.char) &&
      (matchedNumer < currentPattern.range[0] ||
        matchedNumer > currentPattern.range[1])
    ) {
      return false
    }

    // Does not match
    if (!match(char, currentPattern.char) && currentPattern.range[0] > 0) {
      return false
    }
  }

  while (currentPattern !== null) {
    if (currentPattern.range[0] > 0) {
      return false
    }
    currentPattern = getNextPattern()
  }
  return true
}

const testCases = [
  // ['', ''],
  // ['', '*'],
  // ['', 'a*'],
  // ['abc', 'a*b*c'],
  // ['abcc', 'abc*'],
  ['abcb', 'abc*'],
  ['aqasdfjklbccc', '.*'],
  ['abc', '.*c'],
  ['abcdef', 'ab.*ef'],
  ['abcjkljklaksdfef', 'ab.*ef'],
]
testCases.forEach((testCase) => {
  console.log(isMatch(...testCase))
})
