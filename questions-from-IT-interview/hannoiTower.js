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
  let level = 0;
  if (direction === 'left') {
    fromTower = rightTower;
    toTower = leftTower;
  } else {
    fromTower = leftTower;
    toTower = rightTower;
  }
  while (rightTower.length < LEVEL) {
    level += 1;
    step(leftTower,rightTower,level);
    

  }
}