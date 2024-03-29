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
  var superProtos = Object.create(superClass.prototype)
  var currProtos = getProtos(options)
  var mixedProtos = Object.assign(superProtos, currProtos)
  var ctor = options.hasOwnProperty('constructor')
    ? options.constructor
    : superClass
  return createClass(ctor, mixedProtos)
}

function createClass(ctor, protos) {
  function constructor() {
    ctor.apply(this, arguments)
  }

  if (getDataType(protos) === 'object') {
    constructor.prototype = protos
  } else {
    constructor.prototype = Object.prototype
  }

  Object.defineProperty(constructor.prototype, 'constructor', {
    value: constructor,
    configurable: false,
    enumerable: false,
    writable: false,
  })
  return constructor
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
