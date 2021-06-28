function MyPromise(init) {
  const _this = this

  _this.status = 'pending' // Promise 状态
  _this.value = null // Promise 值

  _this.callbacks = [] // 储存 `then` 的callbacks

  function resolve(res) {
    if (_this.status === 'pending') {
      _this.status = 'resolved'
      _this.value = res
      _this.callbacks.forEach(handle)
    } else {
      throw new Error('Promise can only be resolved once.')
    }
  }

  function reject(err) {
    if (_this.status === 'pending') {
      _this.status = 'rejected'
      noticeReject.call(_this, err)
    } else {
      throw new Error('Promise can only be rejected once.')
    }
  }

  function handle(callback) {
    if (_this.status === 'resolved') {
      callback.onFulfilled(_this.value)
    }
    if (_this.status === 'rejected') {
      callback.onRejected(_this.value)
    }
  }

  // 每次都返回一个新的Promise实例，以实现链式调用
  _this.then = function (onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (result) {}
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {}
    }

    // Promise 处于pending
    if (_this.status === 'pending') {
      return new _this.constructor(function (resolve, reject) {
        _this.callbacks.push({
          onFulfilled: function (result) {
            try {
              var res = onFulfilled(result)
              if (res instanceof MyPromise) {
                res.then(resolve, reject)
              }
            } catch (err) {
              reject(err)
            }
          },
          onRejected: function (reason) {
            try {
              var res = onRejected(reason)
              if (res instanceof MyPromise) {
                res.then(resolve, reject)
              }
            } catch (err) {
              reject(err)
            }
          },
        })
      })
    }

    // 已完成
    if (_this.status === 'resolved') {
      return new _this.constructor(function (resolve, reject) {
        try {
          var result = onFulfilled(_this.value)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          }
          resolve(result)
        } catch (err) {
          reject(err)
        }
      })
    }

    // 已失败
    if (_this.status === 'rejected') {
      return new _this.constructor(function (resolve, reject) {
        try {
          var result = onRejected(_this.value)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          }
        } catch (err) {
          reject(err)
        }
      })
    }
  }

  init(resolve, reject)
}

var p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('1000ms')
  }, 1000)
})

p1.then((text) => {
  console.log('1:', text)
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('2000ms')
    }, 2000)
  })
}).then((text) => {
  console.log('2:', text)
  setTimeout(() => {
    console.log('3:2000ms-2')
  }, 2000)
})
