export default class Queue {
  constructor() {
    this.elements = [];
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
  getTop() {
    return this.elements[0];
  }
  isEmpty() {
    return this.elements.length > 0 ? false : true;
  }
}