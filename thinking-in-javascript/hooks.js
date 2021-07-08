/**
 * @description A singleton implementing the some hooks of React
 */

const ReactHooks = (() => {
  const hooks = [] // store the states by calling `useState`'s order
  let effects = [] // store the callbacks of `useEffect`
  let effectsDeps = [] // store the effects' deps
  let currentHookIndex = 0 // current hook index
  let isInited = false

  function onRendered() {
    effects.map((effect, effectIndex) => {
      const { callback, deps } = effect
      // no deps, executes each time
      if (typeof deps === 'undefined') {
        callback && callback()
      }
      // deps === [], executes only once
      else if (Array.isArray(deps) && deps.length === 0 && isInited === false) {
        isInited = true
        callback && callback()
      }
      // has deps, excutes when match the deps
      else if (Array.isArray(deps) && deps.length > 0) {
        let lastDeps = effectsDeps[effectIndex]
        let isUpdated = lastDeps.some((dep, index) => {
          if (dep !== deps[index]) {
            return true
          }
        })
        if (isUpdated) {
          callback && callback()
        }
      }
      // update the effects deps
      effectsDeps[effectIndex] = deps
    })

    // after render, reset all these variables
    currentHookIndex = 0
    effects = []
  }

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
    useEffect(fn, deps) {
      effects.push({
        callback: fn,
        deps: deps,
      })
      effectsDeps.push(deps)
    },
    render(Component) {
      const comp = Component()
      comp.render()

      // After rendering
      onRendered()
      return comp
    },
  }
})()

function Count() {
  const [num1, setNum1] = ReactHooks.useState(0)
  const [num2, setNum2] = ReactHooks.useState(0)

  ReactHooks.useEffect(() => {
    console.log('useEffect.each:', num1, num2)
  })

  ReactHooks.useEffect(() => {
    console.log('useEffect.onMount:', num1, num2)
  }, [])

  ReactHooks.useEffect(() => {
    console.log('useEffect.num1:', num1)
  }, [num1])

  ReactHooks.useEffect(() => {
    console.log('useEffect.num2:', num2)
  }, [num2])

  return {
    click1: () => {
      setNum1(num1 + 1)
    },
    click2: () => {
      setNum2(num2 + 2)
    },
    render: () => {
      console.log('Count.render', { num1, num2 })
    },
  }
}

let comp1 = ReactHooks.render(Count)
comp1.click1()

comp1 = ReactHooks.render(Count)
comp1.click2()

comp1 = ReactHooks.render(Count)
