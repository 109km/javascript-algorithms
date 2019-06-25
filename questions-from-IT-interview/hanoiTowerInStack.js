/**
 * @desc
 * 汉诺塔问题比较经典，这里修改一下游戏规则：
 * 现在限制不能从最左侧的塔直接移动到最右侧，也不能从最右侧直接移动到最左侧，
 * 而是必须经过中间。求当塔有N层的时候，打印最优移动过程和最优移动总步数。
 */

import Stack from '../data-structure/stack';

const LEVEL = 2;

function buildTower(level, name) {
  const tower = new Stack();
  tower.name = name;
  if (!level) {
    return tower;
  }

  let i = level;
  while (i >= 0) {
    tower.push(i);
    i--;
  }
  return tower;
}
function move(n, fromTower, toTower) {
  let output = '';
  let from = fromTower.name;
  let to = toTower.name;
  if (
    from === 'left' && to === 'right' ||
    from === 'right' && to === 'left'
  ) {
    output += `move ${n} from ${from} to mid\n`;
    output += `move ${n} from mid to ${to}\n`;
  }
  if (from === 'mid' || to === 'mid') {
    output = `move ${n} from ${from} to ${to}\n`;
  }
  const fromTop = fromTower.pop();
  toTower.push(fromTop);
  console.log(output);
}
function moveToRight(left, mid, right) {
  let level = left.length;
  while (level > 1) {
    
  }
}


const leftTower = buildTower(5, 'left');
const midTower = buildTower(0, 'mid');
const rightTower = buildTower(0, 'right');

