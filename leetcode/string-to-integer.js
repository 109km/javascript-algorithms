/**
 * @param {string} s
 * @return {number}
 */
const myAtoi = function (s) {
  const MAX_VALUE = Math.pow(2, 31) - 1
  const MIN_VALUE = -Math.pow(2, 31)
  let res = ''

  const isDigit = (char) => {
    return char >= '0' && char <= '9'
  }
  const isMark = (char) => {
    return char === '-' || char === '+'
  }
  const isEmpty = (char) => {
    return char === ' '
  }
  const isEmptyRes = () => {
    return res === ''
  }
  for (let i of s) {
    if (isEmpty(i)) {
      if (isEmptyRes()) {
        continue
      } else {
        break
      }
    } else if (isMark(i)) {
      if (isEmptyRes()) {
        res += i
        continue
      } else {
        break
      }
    } else if (isDigit(i)) {
      res += i
      continue
    } else if (isEmptyRes()) {
      return 0
    } else {
      break
    }
  }
  res = parseInt(res)
  if (res !== res) return 0
  if (res > MAX_VALUE) {
    return MAX_VALUE
  } else if (res < MIN_VALUE) {
    return MIN_VALUE
  }
  return res
}

// Test cases
console.log(myAtoi('   -42 abc'))
console.log(myAtoi('words and 987'))
console.log(myAtoi(' 987 kalsjdklfjl'))
console.log(myAtoi('-21388989898989'))
console.log(myAtoi('+-123'))
console.log(myAtoi('-5-'))
console.log(myAtoi(''))
