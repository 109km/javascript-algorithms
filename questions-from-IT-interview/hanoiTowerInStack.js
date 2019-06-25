/**
 * @desc
 * 汉诺塔问题比较经典，这里修改一下游戏规则：
 * 现在限制不能从最左侧的塔直接移动到最右侧，也不能从最右侧直接移动到最左侧，
 * 而是必须经过中间。求当塔有N层的时候，打印最优移动过程和最优移动总步数。
 */

import Stack from '../data-structure/stack';

const LEVEL = 2;

const leftTower = new Stack();
const midTower = new Stack();
const rightTower = new Stack();

// Using stacks represent towers.
const Towers = [
  leftTower,
  midTower,
  rightTower
]

let totalSteps = 0; // Total steps should equals to 3^n - 1

function buildTower(n, tower) {
  while (n > 0) {
    tower.push(n);
    n--;
  }
}

function tryToMove(from, to) {
  // Big number can't be put above small number.
  const fromTop = Towers[from].getTop();
  const toTop = Towers[to].getTop();
  // Each number can't go back.
  const thisStep = `${to},${from}`;

  // Success
  if (leftTower.length === 0 && midTower.length === 0) {
    return 'end';
  }
  if (fromTop === null) {
    return false;
  }
  if (lastStep === thisStep) {
    return false;
  }
  if (toTop > fromTop || toTop === null) {
    Towers[to].push(Towers[from].pop());
    lastStep = `${from},${to}`;
    totalSteps++;
    console.log(`move ${fromTop} from ${from} to ${to}\n`);
    return true;
  }
  return false;
}


function move() {
  let i = 0;
  let isAble = false;

  while (isAble !== 'end') {
    if (i === 0 || i === 2) {
      isAble = tryToMove(i, 1);
    }
    if (i === 1) {
      isAble = tryToMove(i, 0) || tryToMove(i, 2);
    }
    i++;
    if (i > 2) {
      i = 0;
    }
  }
}

let lastStep = '';
buildTower(3, leftTower);
move();
console.log(totalSteps);
