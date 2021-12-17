const tasksQueue = []
const endCallbacks = []
let TASK_SIGNAL = 0 // 0 : not begin, 1: running, 2: aborted, 3: ended

const add = (task) => {
  if (getDataType(task) !== 'function') {
    throw new TypeError('A `task` must be a function.')
  }
  tasksQueue.push(task)
}

const del = () => {
  tasksQueue.shift()
}

const abort = () => {
  if (TASK_SIGNAL === 3) {
    throw new Error('All tasks are finished.')
  } else if (TASK_SIGNAL === 2) {
    throw new Error('Tasks are aborted, cannot abort.')
  } else if (TASK_SIGNAL === 0) {
    throw new Error("Tasks haven't begin, cannot abort.")
  }
  TASK_SIGNAL = 2
}
const recover = () => {
  if (TASK_SIGNAL === 3) {
    throw new Error('All tasks are finished.')
  } else if (TASK_SIGNAL === 1) {
    throw new Error('Tasks are running, cannot recover.')
  } else if (TASK_SIGNAL === 0) {
    throw new Error("Tasks haven't begin, cannot recover.")
  }
  start()
}
const end = () => {
  TASK_SIGNAL = 3

  while (endCallbacks.length !== 0) {
    const callback = endCallbacks.pop()
    callback()
  }
}
const onEnd = (fn) => {
  if (getDataType(fn) !== 'function') {
    throw new Error('The parameter must be a function.')
  }
  endCallbacks.push(fn)
}

const execute = () => {
  const task = tasksQueue.shift()
  task()
}

const start = () => {
  if (TASK_SIGNAL === 0 || TASK_SIGNAL === 2) {
    TASK_SIGNAL = 1
    while (tasksQueue.length !== 0) {
      if (TASK_SIGNAL <= 1) {
        execute()
      } else {
        return tasksQueue.length
      }
    }
    end()
  }
}

const getDataType = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}

export default { add, del, abort, recover, start, end, onEnd }
