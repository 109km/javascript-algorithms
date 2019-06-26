/**
 * @desc
 * 实现一种狗猫队列的结构，要求如下：
 * 1. 用户可以调用add方法将cat类或dog类的实例放入队列中；
 * 2. 用户可以调用pollAll方法，将队列中所有的实例按照进队列的先后顺序依次弹出；
 * 3. 用户可以调用pollDog方法，将队列中dog类的实例按照进队列的先后顺序依次弹出；
 * 4. 用户可以调用pollCat方法，将队列中cat类的实例按照进队列的先后顺序依次弹出；
 * 5. 用户可以调用isEmpty方法，检查队列中是否还有dog或cat的实例；
 * 6. 用户可以调用isDogEmpty方法，检查队列中是否有dog类的实例；
 * 7. 用户可以调用isCatEmpty方法，检查队列中是否有cat类的实例。
 */

import Queue from '../data-structure/queue';

const PET_TYPES_DOG = 'DOG';
const PET_TYPES_CAT = 'CAT';

class Pet {
  constructor(type) {
    this.type = type;
  }
  getType() {
    return this.type;
  }
}

class Dog extends Pet {
  constructor() {
    super(PET_TYPES_DOG);
  }
}

class Cat extends Pet {
  constructor() {
    super(PET_TYPES_CAT);
  }
}

class PetQueue {
  constructor() {
    this.queue = new Queue();
  }
  get length() {
    return this.queue.length;
  }
  add(elem) {
    if (elem instanceof Dog || elem instanceof Cat) {
      this.queue.enQueue(elem);
    } else {
      throw new TypeError('This queue only accpets dogs and cats.');
    }
  }
  pollAll() {
    while (!this.isEmpty()) {
      this.queue.deQueue();
    }
  }
  _pollWithType(type) {
    const leftQueue = new Queue();
    const outQueue = new Queue();
    while (!this.isEmpty()) {
      const top = this.queue.getTop();
      if (top.type === type) {
        outQueue.enQueue(top);
      } else {
        leftQueue.enQueue(top);
      }
      this.queue.deQueue();
    }
    this.updateQueue(leftQueue);
    return outQueue;
  }
  updateQueue(queue) {
    this.pollAll();
    while (!queue.isEmpty()) {
      this.queue.enQueue(queue.deQueue());
    }

  }
  pollDog() {
    return this._pollWithType(PET_TYPES_DOG);
  }
  pollCat() {
    return this._pollWithType(PET_TYPES_CAT);
  }
  isEmpty() {
    return this.queue.isEmpty();
  }
  _isPetEmpty(type) {
    const tempQueue = new Queue();
    const hasPet = false;
    while (!this.isEmpty()) {
      const top = this.queue.deQueue();
      tempQueue.enQueue(top);
      if (top.type === type) {
        hasDog = true;
      }
    }
    return hasPet;
  }
  isDogEmpty() {
    return this._isPetEmpty(PET_TYPES_DOG);
  }
  isCatEmpty() {
    return this._isPetEmpty(PET_TYPES_DOG);
  }
}


const petQueue = new PetQueue();

let i = 0;
while (i < 10) {
  if (i % 2 === 0) {
    petQueue.add(new Dog());
  } else {
    petQueue.add(new Cat());
  }
  i++;
  
}

console.log(petQueue)
petQueue.pollCat();
console.log(petQueue);
