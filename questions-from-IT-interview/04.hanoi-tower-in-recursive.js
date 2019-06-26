/**
 * @desc
 * 汉诺塔问题比较经典，这里修改一下游戏规则：
 * 现在限制不能从最左侧的塔直接移动到最右侧，也不能从最右侧直接移动到最左侧，
 * 而是必须经过中间。求当塔有N层的时候，打印最优移动过程和最优移动总步数。
 */

import Stack from '../data-structure/stack';

// Using stacks represent towers.
const Towers = {
  left: new Stack(),
  mid: Stack(),
  right: new Stack()
}

let totalSteps = 0; // Total steps should equals to 3^n - 1

function buildTower(n, tower) {
  while (n > 0) {
    tower.push(n);
    n--;
  }
}

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

/**
 * @desc The whole process can be divided into the 5 steps below.
 * The `from` or `to` can be `leftTower` or `rightTower`.
 * 1. move n-1 `from` to `to` 
 * 2. move n to `mid`
 * 3. move n-1 from `to` to `from`
 * 4. move n from `mid` to `to`
 * 5. move n-1 from `from` to `to`
 * Until the `from` tower has no elements any more, this process ends.
 * 
 * @param {number} n The level of the tower
 * @param {string} to The direction\
 */

function move(n, to) {
  let from = to === 'right' ? 'left' : 'right';
  if (n === 1) {
    step(n, from, to);
    return;
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