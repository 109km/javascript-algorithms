/**
 * The string "PAYPALISHIRING" is written in a zigzag pattern
 * on a given number of rows like this:
 * (you may want to display this pattern in a fixed font for better legibility)
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * And then read line by line: "PAHNAPLSIIGYIR"
 * Write the code that will take a string and make this conversion given a number of rows:
 * string convert(string text, int nRows);
 * convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".
 *
 * time: O(n)
 * space: O(n)
 */
const convert = (s, numRows) => {
  const rows = []
  let startRow = 0
  let endRow = numRows - 1
  let currenRow = 0
  let currentCol = 0
  let isDown = true
  for (let i = 0; i < s.length; i++) {
    if (rows[currenRow] === undefined) {
      rows[currenRow] = []
    }
    // Direction is going down
    if (isDown) {
      rows[currenRow++][currentCol] = s[i]
    } else {
      rows[currenRow--][currentCol] = s[i]
    }

    // last row
    if (currenRow === endRow) {
      isDown = false
      currentCol++
    } else if (currenRow === startRow) {
      isDown = true
      currentCol++
    }
  }

  let result = ''
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] !== undefined) {
      result += rows[i].join('')
    }
  }

  return result
}
/**
 *
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 *
 */
const convertV2 = (s, numRows) => {
  if (numRows === 1) return s

  const n = s.length
  const groupSize = 2 * numRows - 2
  const result = []
  for (let i = 0; i < n; i++) {
    const elementIndex = i % groupSize
    const row = elementIndex < numRows ? elementIndex : groupSize - elementIndex
    if (result[row] === undefined) {
      result[row] = ''
    }
    result[row] += s[i]
  }
  return result.join('')
}

const convertV3 = (s, numRows) => {
  // 1. Make an array with the zigzag sequence
  const zigzag = [...new Array(numRows).keys()]
  zigzag.push(...zigzag.slice(1, -1).reverse())
  // 2. Make an array with as many strings as we need rows
  const rows = new Array(numRows).fill('')
  // 3. Append the characters to the row strings in zigzag sequence
  ;[...s].forEach((c, i) => (rows[zigzag[i % zigzag.length]] += c))
  // 4. Join the row strings in the array together
  return rows.join('')
}

const s = 'PAYPALISHIRING'
const numRows = 3
console.log(convertV2(s, numRows))
