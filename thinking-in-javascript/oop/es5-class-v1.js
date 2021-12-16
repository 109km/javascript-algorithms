// Simulate the `class` keyword in es6 by es5 function

function getDataType(o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}

function Pet(name) {
  this.name = name
}
Pet.prototype.hello = function () {
  console.log('Hello, I"m ' + this.name)
}

function Dog(name, age) {
  Pet.call(this, name)
  this.age = age
}
Dog.prototype = Object.create(Pet.prototype)
Object.defineProperty(Dog.prototype, 'constructor', {
  value: Dog,
  enumerable: false,
  writable: true,
})

Dog.prototype.bark = function () {
  console.log(this.name + ' is barking')
}
