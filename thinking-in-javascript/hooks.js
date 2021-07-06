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
