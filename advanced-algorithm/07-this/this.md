# Confusing `this` in JavaScript

`this` is used to create a connection between inside environment and outside environment. 

It can be understood like this: who's calling me? And this who is `this`.

So the key is we must find `who` is executing the function, so that we find `this`.

It depends on 4 things: 

1. How the function's name is be found
2. How the function is called
3. Whether it's be called in strict mode or not

### Example 1:

```js
function foo(){
  console.log(this);
}
foo(); // window
```
The function's name is be found in global enviroment through the name `foo`. It's called just as a normal function by adding `()` after its name.

So its `this` is `Global`, if the global enviroment is browser, it will be `window`, but if the mode is strict, it will be `undefined`.


### Example 2:

```js
var p = {
  name: "John",
  sayName:function(){
    console.log(this.name);
  }
}

p.sayName(); // John
```

Now the function's name is a little complex : `p.sayName`.

And it's be found through object `p`'s property `sayName`, it's like: hey `p` can you find `sayName` for me? 

So the connector between `sayName` and global enviroment is `p`, and it's called in a normal way without strict mode.

We can conclude that `this` in `sayName` is `p`.

### Example 3:

```js
var p = {
  name: "John",
  sayName:function(){
    console.log(this.name);
  }
}
var a = p.sayName;
a(); // window
```

This example is nearly the same with previous one, but here we've got a new variable `a`, and its value points to `p.sayName`.

This time when we call `a`, there's no intermediary, the enviroment is global, so `this` equals `window`.

### Example 4:

```js
var p = {
  name: "John",
  sayName:function(){
    console.log(this.name);
  }
}
(false || p.sayName)(); // window
```

This code is a little confusing: the left part `(false || p.sayName)`'s value is `p.sayName` with no doubt. According to the example 2, `this` should be `p`.

But the result shows `this` is `window`! Why?

The trap is that `(false || p.sayName)` is executed in the global environment, the result is stored in a hidden anonymous variable in global environment! 

Now you can see the reason.

### Example 5:

```js
function Human(){
  console.log(this);
}
var someone = new Human();
```

This situation is so easy, just remember when a function is used as a constructor, the `this` is the instance which it creates.
