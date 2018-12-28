class Stack {
  constructor(...args) {
    this.elements = args;
  }
  get length(){
    return this.elements.length;
  }
  push(element) {
    this.elements.push(element);
    return this.elements;
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

let s = new Stack(1,23,5);
s.push(10);
console.log(s);