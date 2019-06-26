import Stack from './stack';

class QueueImplByStack {
  constructor() {
    this.inputStack = new Stack();
    this.outputStack = new Stack();
  }
  _convertInputToOutput() {
    while (this.inputStack.length > 0 && this.outputStack.length === 0) {
      let elem = this.inputStack.pop();
      this.outputStack.push(elem);
    }
  }
  enQueue(element) {
    this.inputStack.push(element);
  }
  deQueue() {
    this._convertInputToOutput();
    return this.outputStack.pop();
  }
}

const queue = new QueueImplByStack();

let i = 1;
while (i <= 5) {
  queue.enQueue(i);
  i++;
}

console.log(queue.deQueue());
queue.enQueue(8);
console.log(queue.deQueue());

