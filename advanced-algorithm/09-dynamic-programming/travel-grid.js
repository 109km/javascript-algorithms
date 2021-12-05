
// Brute foce
function travelGrid(m, n) {
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  return travelGrid(m - 1, n) + travelGrid(m, n - 1)
}

// With memo
function travelGridWithMemo(m, n, memo = {}) {
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  const key = m + ',' + n;
  if (memo[key]) return memo[key];
  memo[key] = travelGridWithMemo(m - 1, n, memo) + travelGridWithMemo(m, n - 1, memo)
  return memo[key]
}

console.log(travelGridWithMemo(1, 3))
console.log(travelGridWithMemo(2, 3))
console.log(travelGridWithMemo(16, 20))


