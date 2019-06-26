export default class DoubleEndedQueue {
  constructor() {
    this.elements = [];
  }
  get length() {
    return this.elements.length;
  }
  addFront(element) {
    this.elements.unshift(element);
  }
  addBack(element) {
    this.elements.push(element);
  }
  popBack() {
    return this.elements.pop();
  }
  popFront() {
    return this.elements.shift();
  }
  getFirst() {
    if (this.isEmpty()) {
      return null;
    }
    return this.elements[0];
  }
  getLast() {
    if (this.isEmpty()) {
      return null;
    }
    return this.elements[this.elements.length - 1];
  }
  isEmpty() {
    return this.elements.length > 0 ? false : true;
  }
}