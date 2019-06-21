import Stack from './stack';

class StackMin extends Stack {
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
    console.log(this.minStack);
    return this.minStack.getTop();
  }
}

const stack = new StackMin();
stack.push(5).push(3).push(2).push(10).push(5);
console.log(stack.getMin());
stack.pop();
stack.pop();
stack.pop();
console.log(stack.getMin());
