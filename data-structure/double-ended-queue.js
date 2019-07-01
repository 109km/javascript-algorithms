export default class DoubleEndedQueue {
  constructor() {
    this.elements = [];
  }
  get length() {
    return this.elements.length;
  }
  addFirst(element) {
    this.elements.unshift(element);
  }
  addLast(element) {
    this.elements.push(element);
  }
  popLast() {
    return this.elements.pop();
  }
  popFirst() {
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