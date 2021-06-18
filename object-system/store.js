const store = (() => {
  // This object is used to store data
  const state = new Map()

  // This object is used to store state listeners
  const listeners = {}

  // This object is used to notice all the listeners by `key`
  const notice = (key, value) => {
    listeners[key].forEach((fn) => {
      if (typeof fn === 'function') {
        fn(value)
      }
    })
  }

  // This object is an exported interface used to communicate with the stored data
  return {
    get(key) {
      return state.get(key)
    },
    set(key, value) {
      state.set(key, value)
      notice(key, value)
    },
    delete(key) {
      state.delete(key)
      notice(key, null)
    },
    on(key, fn) {
      if (!listeners[key]) listeners[key] = []
      listeners[key].push(fn)
    },
    off(key) {
      listeners[key] = []
    },
  }
})()

store.on('name', (val) => {
  console.log('`name` is updated:', val)
})

store.set('name', 1)
store.set('name', 2)
store.delete('name')
