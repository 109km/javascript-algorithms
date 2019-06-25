/**
 * @desc
 * 汉诺塔问题比较经典，这里修改一下游戏规则：
 * 现在限制不能从最左侧的塔直接移动到最右侧，也不能从最右侧直接移动到最左侧，
 * 而是必须经过中间。求当塔有N层的时候，打印最优移动过程和最优移动总步数。
 */

import Stack from '../data-structure/stack';

const leftTower = new Stack();
const midTower = new Stack();
const rightTower = new Stack();

const Towers = {
  left: leftTower,
  mid: midTower,
  right: rightTower
}
let totalSteps = 0; // Total steps should equals to 3^n - 1

function buildTower(n, tower) {
  while (n > 0) {
    tower.push(n);
    n--;
  }
}

// move n-1 `from` to `to` 

// move n to mid

// move n-1 from `to` to `from`

// move n from `from` to `to`

// move n-1 from `from` to `to`

function step(n, from, to) {
  let output = '';
  let steps = 0;
  if (
    from === 'left' && to === 'right' ||
    from === 'right' && to === 'left'
  ) {
    output += `move ${n} from ${from} to mid\n`;
    output += `move ${n} from mid to ${to}\n`;
    steps = 2;
  }
  if (from === 'mid' || to === 'mid') {
    output = `move ${n} from ${from} to ${to}\n`;
    steps = 1;
  }
  const fromTop = Towers[from].pop();
  Towers[to].push(fromTop);
  totalSteps += steps;
  console.log(output);
}

function move(n, to) {
  let from = to === 'right' ? 'left' : 'right';
  if (n === 1) {
    step(n, from, to);
    return false;
  } else {
    move(n - 1, to);
    step(n, from, 'mid');
    move(n - 1, from);
    step(n, 'mid', to);
    move(n - 1, to);
  }
}

const LEVEL = 4;

buildTower(LEVEL, leftTower);
move(LEVEL, 'right');
console.log(totalSteps);