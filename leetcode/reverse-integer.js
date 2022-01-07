const reverse = (x) => {
  let result = 0
  let isPositive = x > 0
  const MAX_INT = Math.pow(2, 31) - 1
  const MIN_INT = -Math.pow(2, 31)
  if (!isPositive) {
    x = -x
  }
  while (x !== 0) {
    const lastDigit = x % 10
    result = result * 10 + lastDigit
    if (result > MAX_INT || result < MIN_INT) {
      return 0
    }
    x = Math.floor(x / 10)
  }
  return isPositive ? result : -result
}

console.log(reverse(-1253))
