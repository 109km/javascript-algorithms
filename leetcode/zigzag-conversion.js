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

const s = 'PAYPALISHIRING'
const numRows = 3
console.log(convert(s, numRows))
