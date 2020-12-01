class Queue {
  constructor() {
    this.elements = [];
  }
  get size() {
    return this.elements.length;
  }
  enqueue(el) {
    this.elements.push(el);
  }
  dequeue() {
    return this.elements.shift();
  }
  isEmpty() {
    return this.elements.length === 0 ? true : false;
  }
  front() {
    return this.elements[0];
  }
  end() {
    return this.elements[this.size - 1];
  }
  clear() {
    return this.elements = [];
  }
}

class Dequeue {
  constructor() {
    this.elements = [];
  }
  get size() {
    return this.elements.length;
  }
  addFront(el) {
    this.elements.unshift(el);
  }
  removeFront() {
    return this.elements.shift();
  }
  addEnd(el) {
    this.elements.push(el);
  }
  removeEnd() {
    return this.elements.pop();
  }
  clear() {
    this.elements = [];
  }
  front() {
    return this.elements[0];
  }
  end() {
    return this.elements[this.size - 1];
  }
}
module.exports = {
  Queue,
  Dequeue
}