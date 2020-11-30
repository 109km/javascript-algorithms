class MinStack {
  constructor() {
    this.min = null;
    this.elements = [];
    this.__orderedElements = [];
  }
  get top() {
    return this.elements[0];
  }
  get size() {
    return this.elements.length;
  }
  push(el) {
    if (this.min === null) {
      this.min = el;
    } else {
      for (let i = 0; i < this.size; i++) {
        if (this.__orderedElements[i] > el) {
          this.__orderedElements.splice(i, 0, el);
          break;
        }
      }
    }
    this.elements.unshift(el);
  }
  pop() {
    const ele = this.elements.shift();
    for (let i = 0; i < this.size; i++) {
      if (this.__orderedElements[i] === ele) {
        this.__orderedElements.splice(i, 1);
        break;
      }
    }
    return ele;
  }
  getMin() {
    return this.min;
  }
}

const s = new MinStack();
s.push(2);
s.push(3);
s.push(-1);
s.push(-3);
s.pop();
s.pop();

console.log(s.getMin()); // 2