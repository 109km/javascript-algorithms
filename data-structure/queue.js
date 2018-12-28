class Queue {
  constructor(...args) {
    this.elements = args;
  }
  get length() {
    return this.elements.length;
  }
  enQueue(element) {
    this.elements.push(element);
  }
  deQueue() {
    return this.elements.shift();
  }
  isEmpty() {
    return this.elements.length > 0 ? false : true;
  }
}