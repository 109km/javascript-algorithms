/**
 * @desc
给定一个整型矩阵map，其中的值只有0和1两种，求其中全是1的所有矩形区域中，最大的矩形区域为1的数量。
例如：
1   0   1   0
1   1   1   1
1   1   1   0
其中，最大的矩形区域有6个1，所以返回6。
 */

import Stack from '../../data-structure/stack';

function getMaxMatrixArea(matrix) {
  let maxArea = 0;
  const maxtrixHeight = matrix.length;
  const maxtrixWidth = matrix[0].length;
  const heightArr = [];
  for (let y = 0; y < maxtrixHeight; y++) { // y
    for (let x = 0; x < maxtrixWidth; x++) { // x
      if (heightArr[x] === undefined) {
        heightArr[x] = 0;
      }
      heightArr[x] = matrix[y][x] === 0 ? 0 : heightArr[x] + 1;
    }
    // Calculate the max area after each get each row's max height.
    maxArea = Math.max(maxRecFromBottom(heightArr), maxArea);
  }
  return maxArea;
}
function maxRecFromBottom(heightArr) {
  if (heightArr.length === 0) {
    return 0;
  }
  let maxArea = 0;
  const stack = new Stack();
  function calculateMaxArea(x, stack, heightArr) {
    let lastX = stack.pop();
    let k = stack.isEmpty() ? -1 : stack.getTop();
    const currentArea = (x - k - 1) * heightArr[lastX];
    return Math.max(maxArea, currentArea);;
  }
  for (let x = 0; x < heightArr.length; x++) {
    // `heightArr[x]` means each column's max height. 
    // if current height smaller than 
    while (!stack.isEmpty() && heightArr[x] <= heightArr[stack.getTop()]) {
      // This area is x-1 's area,not current one's.
      maxArea = calculateMaxArea(x, stack, heightArr);
    }
    stack.push(x);
  }
  // Calculate the last one's area.
  while (!stack.isEmpty()) {
    maxArea = calculateMaxArea(heightArr.length, stack, heightArr);
  }
  return maxArea;
}



const matrix = [
  [1, 1, 1, 0],
  [1, 1, 0, 1],
  [0, 1, 1, 1]
]
const maxArea = getMaxMatrixArea(matrix);
console.log(maxArea);
