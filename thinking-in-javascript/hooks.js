/**
 * @description A singleton implementing the some hooks of React
 */

const ReactHooks = (() => {
  const hooks = [] // store the states by calling `useState`'s order
  let currentHookIndex = 0 // current hook index

  return {
    useState(initial) {
      // index is stored in this closure
      const index = currentHookIndex

      // initialize, if there's already a state do nothing
      if (typeof hooks[index] === 'undefined') {
        hooks[index] = initial
      }

      // change the corresponding index's state
      function setState(newState) {
        if (newState !== hooks[index]) {
          hooks[index] = newState
        }
      }

      // move to the next index
      currentHookIndex++

      return [hooks[index], setState]
    },
    render(Component) {
      const comp = Component()
      comp.render()

      // After rendering, reset the index.
      currentHookIndex = 0
      return comp
    },
  }
})()

function runReactHooksExample() {
  function Count() {
    const [num1, setNum1] = ReactHooks.useState(0)
    const [num2, setNum2] = ReactHooks.useState(0)
    return {
      click: () => {
        setNum1(num1 + 1)
        setNum2(num2 + 2)
      },
      render: () => {
        console.log('Count.render', { num1, num2 })
      },
    }
  }

  let comp1 = ReactHooks.render(Count)
  comp1.click()

  comp1 = ReactHooks.render(Count)
  comp1.click()

  comp1 = ReactHooks.render(Count)
}

/**
 * @description This is a very simple example of react hooks.
 * @param {Any} initial The initial value of this state.
 * @returns {Function} A function contains this state's getter and setter.
 */
function createState(initial) {
  let val = initial
  return function () {
    function setState(newState) {
      val = newState
    }
    function getState() {
      return val
    }
    return [getState, setState]
  }
}

function runSimpleHooksExample() {
  const state1 = createState(1)
  const state2 = createState(2)
  const [num1, setNum1] = state1()
  const [num2, setNum2] = state2()
  setNum1(2)
  setNum2(6)
  console.log('After setState:', num1(), num2())
}

runSimpleHooksExample()
