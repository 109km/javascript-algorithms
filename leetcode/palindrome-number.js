const isPalindrome = (x) => {
  const MAX = Math.pow(2, 31) - 1
  const MIN = -Math.pow(2, 31)

  if (x > MAX || x < MIN) {
    return false
  }

  const s = x.toString()
  let i = 0
  let j = s.length - 1
  while (i <= j) {
    if (s[i] !== s[j]) {
      return false
    }
    i++
    j--
  }
  return true
}

const isPalindrome_v2 = (x) => {
  const arr = String(x).split('')
  while (arr.length > 1) {
    if (arr.shift() !== arr.pop()) {
      return false
    }
  }
  return true
}

console.log(isPalindrome(121))
console.log(isPalindrome(0))
console.log(isPalindrome(33112))
console.log(isPalindrome(-3112))
