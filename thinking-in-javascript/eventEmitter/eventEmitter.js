class Listener {
  constructor(fn, once) {
    this.fn = fn
    this.once = once || false
  }
}

class EventEmitter {
  constructor() {
    this.events = createEvents()
  }
  on(eventName, fn) {
    addListener(this, eventName, fn, false)
  }
  once(eventName, fn) {
    addListener(this, eventName, fn, true)
  }
  emit(eventName, ...args) {
    triggerEvent(this, eventName, args)
  }
  removeListener(eventName, fn) {
    removeListener(this, eventName, fn)
  }
  removeEvent(eventName) {
    removeEvent(this, eventName)
  }
  reset() {
    this.events = createEvents()
  }
}

function createEvents() {
  return Object.create(null)
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function addListener(emitter, eventName, fn, once) {
  const events = emitter.events
  if (!events) {
    throw new Error('Emitter must have `events`')
  }
  if (!hasOwnProperty(events, eventName)) {
    events[eventName] = []
  }
  const listener = new Listener(fn, once)
  events[eventName].push(listener)
}

function removeListener(emitter, eventName, fn) {
  const listeners = validateEventListeners(emitter, eventName)
  const events = emitter.events
  events[eventName] = listeners.filter((listener) => listener.fn !== fn)
}

function triggerEvent(emitter, eventName, eventData) {
  const listeners = validateEventListeners(emitter, eventName)
  listeners.forEach((listener) => {
    if (listener.once === true) {
      removeListener(emitter, eventName, listener.fn)
    }
    listener.fn.apply(emitter, eventData)
  })
}

function removeEvent(emitter, eventName) {
  const events = emitter.events
  if (!events) {
    throw new Error('Emitter must have `events`')
  }
  if (hasOwnProperty(events, eventName)) {
    delete events[eventName]
  } else {
    throw new Error(`Event '${eventName}' not found`)
  }
}

function validateEventListeners(emitter, eventName) {
  const events = emitter.events
  if (!events) {
    throw new Error('Emitter must have `events`')
  }
  const listeners = events[eventName]
  if (
    !hasOwnProperty(events, eventName) ||
    Array.isArray(listeners) === false ||
    listeners.length === 0
  ) {
    throw new Error(`No listeners for event '${eventName}'`)
  }
  return listeners
}
