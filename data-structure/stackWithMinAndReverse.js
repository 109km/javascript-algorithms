import Stack from './stack';

class StackWithMinAndReverse extends Stack {
  constructor() {
    super();
    this.minStack = new Stack();
  }
  _compareMinStackPush(element) {
    const minStackTopElement = this.minStack.getTop();
    if (!minStackTopElement) {
      this.minStack.push(element);
    }
    if (element && minStackTopElement && element <= minStackTopElement) {
      this.minStack.push(element);
    }
  }
  _compareMinStackPop() {
    const minStackTopElement = this.minStack.getTop();
    const element = this.getTop();
    if (element && minStackTopElement && element <= minStackTopElement) {
      this.minStack.pop();
    }
  }
  push(element) {
    this._compareMinStackPush(element);
    this.elements.push(element);
    return this;
  }
  pop() {
    this._compareMinStackPop();
    return this.elements.pop();
  }
  getMin() {
    return this.minStack.getTop();
  }
  getAndRemoveLastElement() {
    const elem = this.pop();
    if (this.isEmpty()) {
      return elem;
    } else {
      const nextElem = this.getAndRemoveLastElement();
      this.push(elem);
      return nextElem;
    }
  }
  reverse() {
    if (this.isEmpty()) {
      return;
    }
    const elem = this.getAndRemoveLastElement();
    this.reverse();
    this.push(elem);
  }
}

const stack = new StackWithMinAndReverse();
stack.push(5).push(3).push(2).push(8).push(4);
stack.reverse();
console.log(stack);
