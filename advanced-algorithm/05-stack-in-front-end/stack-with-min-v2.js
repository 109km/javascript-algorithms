class MinStack {
  constructor() {
    this.min = Infinity;
    // Each element is also an array [currentValue,currentMin]
    this.elements = [];
  }
  get top() {
    return this.elements[this.size - 1][0];
  }
  get size() {
    return this.elements.length;
  }
  push(el) {
    if (this.min > el) {
      this.min = el;
      this.elements.push([el, el]);
    } else {
      this.elements.push([el, this.min]);
    }
  }
  pop() {
    const ele = this.elements.pop();
    return ele[0];
  }
  getMin() {
    return this.elements[this.size - 1][1];
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