import SinglelyLinkedList from './singlely-linked-list.js';

const list = new SinglelyLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.remove(0);
list.remove(2);
console.log(list.getTail());