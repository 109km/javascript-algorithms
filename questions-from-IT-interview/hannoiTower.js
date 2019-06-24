import Stack from '../data-structure/stack';

const leftTower = new Stack();
const rightTower = new Stack();
const midTower = new Stack();
leftTower.name = 'left';
rightTower.name = 'right';
midTower.name = 'mid';

const LEVEL = 5;

let totalSteps = 0;

function initTower(level, tower) {
  let i = 1;
  while (level === i) {
    tower.push(i);
    i++;
  }
}

function step(fromTower, toTower, num) {
  const from = fromTower.name;
  const to = toTower.name;
  let output = ``;

  if (
    from === 'left' && to === 'right' ||
    from === 'right' && to === 'left'
  ) {
    output += `move ${num} from ${from} to mid\n`;
    output += `move ${num} from mid to ${to}\n`;
    totalSteps += 2;
    toTower.push(fromTower.pop());
  }

  if (from === 'mid' || to === 'mid') {
    output += `move ${num} from ${from} to ${to}\n`;
    totalSteps += 1;
    toTower.push(fromTower.pop());
  }
  console.log(output);
}


function move(direction) {
  let toTower = null;
  let fromTower = null;
  if (direction === 'left') {
    fromTower = rightTower;
    toTower = leftTower;
  } else {
    fromTower = leftTower;
    toTower = rightTower;
  }
  let maxLevel = fromTower.length;
  let currentLevel = 0;
  while (currentLevel < maxLevel) {
    currentLevel += 1;
    if (currentLevel === 1) {
      // move n-1 to right
      step(fromTower, toTower, currentLevel);

      // move n to mid
      step(leftTower, midTower, currentLevel + 1);

      // move n-1 to left
      step(rightTower, leftTower, currentLevel);

      // move n to right
      step(midTower, rightTower, currentLevel + 1);

      // move n-1 to right;
      step(leftTower, rightTower, currentLevel);
    }



  }
}

initTower(1, leftTower);
move('right');