// Simulate the `class` keyword in es6 by es5 function

function Class(options) {
  if (
    options.hasOwnProperty('constructor') &&
    getDataType(options.constructor) !== 'function'
  ) {
    throw new Error('Constructor must a function.')
  }
  var ctor = options.constructor
  var protos = getProtos(options)
  return createClass(ctor, protos)
}
Class.extend = function (superClass, options) {
  var superProtos = getProtos(superClass.prototype)
  var currProtos = getProtos(options)
  var mixedProtos = Object.assign({}, superProtos, currProtos)
  var ctor = options.hasOwnProperty('constructor')
    ? options.constructor
    : superClass
  return createClass(ctor, mixedProtos)
}

function createClass(ctor, protos) {
  function newClass() {
    ctor.apply(this, arguments)
  }
  newClass.prototype = Object.assign({}, protos) // Just replace it directly
  return newClass
}

function getDataType(o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}
function createPlainObject() {
  return Object.create(null)
}
function getProtos(options) {
  var keys = Object.keys(options)
  var protos = createPlainObject()
  var i = 0
  for (; i < keys.length; i++) {
    var key = keys[i]
    if (key !== 'constructor') {
      protos[key] = options[key]
    }
  }
  return protos
}

var Dog = Class({
  constructor: function (name) {
    this.name = name
  },
  run: function () {
    console.log(this.name + ' is running.')
    return this
  },
})

var dog1 = new Dog('Snoopy')
dog1.run()

var WildDog = Class.extend(Dog, {
  jump: function () {
    console.log(this.name + ' is jumping wildly.')
    return this
  },
  run: function () {
    console.log(this.name + ' is running wildly.')
    return this
  },
})

var dog2 = new WildDog('Goofy')
dog2.jump().run()

var WildHusky = Class.extend(WildDog, {
  type: 'Husky',
  constructor: function (name, color) {
    this.name = name
    this.color = color
  },
  bark: function () {
    console.log(
      this.name +
        ' is barking, this kind of ' +
        this.type +
        ' like to bark, ' +
        'and its color is ' +
        this.color,
    )
  },
})
var dog3 = new WildHusky('Foo', 'white')
dog3.bark()
