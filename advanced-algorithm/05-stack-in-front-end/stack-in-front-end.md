# Stack in front end

## A brief introduction of `stack`

This data structure is like a cup, if we pouring some water into the cup, the last water to be poured is the first to be drunk.  

In another word, this structure reverses the origin order: first in last out.

The picture below shows how the mechanism works. 

![stack-water](./stack-water.jpg)

Here is the example implementation of `stack`: 

```js
class Stack {
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
    if (this.isEmpty()) {
      return null;
    }
    return this.elements[this.elements.length - 1];
  }
}
```

The key actions are `push` and `pop`:
* push : Put an element into stack.
* pop : Take an element out of the stack.

Now we can know if there are n elements in a stack, the searching time complexity is `O(n)`.

`push` and `pop`'s time complexity is `O(1)`.

## How `stack` works when a browser's running JavaScript

A browser runs JavaScript with single thread.

Why?

Because of `DOM`'s operations. Let's assume that there're multiple threads can operate `DOM` at the same time, we've got two solutions:

1. Single thread.
2. A `DOM` lock.

And JavaScript used the first solution. But this solution has got one problem: if some task needs a lot of time to excute, other tasks had to be wait in line. This may cause page stucked which is not a good experience for users.

To solve this problem, JavaScript has two excution modes:

**Sync**

```js
let a = 1;

if ( a > 0){
  console.log("This is a sync task");
}
```

**Async**

```js
// async task
setTimeout(()=>{
  console.log('Print later');
},100);

console.log('Print first'); // sync task
```