export default class Stack {
  constructor() {
    this.elements = [];
  }
  get length() {
    return this.elements.length;
  }
  push(element) {
    this.elements.push(element);
    return this;
  }
  pop() {
    return this.elements.pop();
  }
  isEmpty() {
    return this.elements.length === 0 ? true : false;
  }
  getTop() {
    return this.elements[this.elements.length - 1];
  }
}

// let s = new Stack();
// s.push(10).push(5).push(8);
// console.log(s);