export default class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
  init(start, end) {
    let current = this;
    for (let i = start; i <= end; i++) {
      current.next = new LinkedListNode(i);
      current = current.next;
    }
  }
}