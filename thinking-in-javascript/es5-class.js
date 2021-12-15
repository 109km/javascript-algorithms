// Simulate the `class` keyword in es6 by es5 function

function getDataType(o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}

function addPrototypes(obj, options) {
  var keys = Object.keys(options)
  var i = 0
  while (i < keys.length) {
    var key = keys[i++]
    var val = options[key]
    var type = getDataType(options[key])
    if (key !== 'constructor') {
      if (type === 'function') {
        obj['__proto__'][key] = val.bind(obj)
      } else {
        obj['__proto__'][key] = val
      }
    }
  }
}
function Class(options) {
  if (
    options.hasOwnProperty('constructor') &&
    getDataType(options.constructor) !== 'function'
  ) {
    throw new Error('Constructor must a function.')
  }
  function innerClass() {
    var _this = {}
    var args = [].slice.call(arguments)
    options.constructor.apply(_this, args)
    addPrototypes(_this, options)
    return _this
  }
  return innerClass
}
Class.extend = function (superClass, options) {
  // Plain Object
  if (superClass === null) {
    return Object.create(null)
  }
  if (getDataType(superClass) !== 'function') {
    throw new Error('Parent class must a function.')
  }
  function childClass() {
    var _this = {}
    var args = [].slice.call(arguments)
    if (
      options.hasOwnProperty('constructor') &&
      getDataType(options.constructor) === 'function'
    ) {
      options.constructor.apply(_this, args)
    } else {
      _this = superClass.apply(_this, args)
    }
    addPrototypes(_this, options)
    return _this
  }
  return childClass
}

var Dog = Class({
  constructor: function (name) {
    this.name = name
  },
  bark: function () {
    console.log(this.name + ' saying: woof!')
    return this
  },
  run: function () {
    console.log(this.name + ' is running!')
    return this
  },
})

var snoopy = new Dog('snoopy')
snoopy.bark()

var Husky = Class.extend(Dog, {
  type: 'Husky',
  constructor: function (name, age) {
    this.name = name
    this.age = age
  },
  jump: function () {
    console.log(this.name + ' is jumping!')
    return this
  },
  run: function () {
    console.log(this.name + ' is running crazily at age ' + this.age)
  },
})

var husky = new Husky('husky', 12)
husky.jump().run()

var BlackHusky = Class.extend(Husky, {
  color: 'black',
  run: function () {
    console.log(
      this.name +
        ' is running fast like ' +
        this.color +
        ' light, and its age is ' +
        this.age,
    )
  },
})
var blackHusky = new BlackHusky('QQQ', 5)
blackHusky.run()
