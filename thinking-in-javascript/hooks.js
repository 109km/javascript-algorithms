/**
 * @description A singleton implementing the some hooks of React
 */

const ReactHooks = (() => {
  const hooks = [] // store the states by calling `useState`'s order
  const memos = [] // store the callbacks and dependencies of `useMemo`
  let effects = [] // store the callbacks of `useEffect`
  let effectsDeps = [] // store the effects' deps
  let currentHookIndex = 0 // current hook index
  let currentMemoIndex = 0
  let isInited = false

  function onRendered() {
    executeEffects()
    reset()
  }

  function isDepsUpdated(newDeps, oldDeps) {
    if (Array.isArray(newDeps) === false) {
      throw new Error('The first argument must be an array.')
    }
    if (Array.isArray(oldDeps) === false) {
      throw new Error('The second argument must be an array.')
    }

    return oldDeps.some((dep, index) => {
      if (dep !== newDeps[index]) {
        return true
      }
    })
  }

  // after render, reset all these variables
  function reset() {
    currentHookIndex = 0
    currentMemoIndex = 0
    effects = []
  }

  function executeEffects() {
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
        let isUpdated = isDepsUpdated(deps, lastDeps)
        if (isUpdated) {
          callback && callback()
        }
      }
      // update the effects deps
      effectsDeps[effectIndex] = deps
    })
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
    useMemo(fn, deps) {
      if (!Array.isArray(deps)) {
        throw new Error('The second argument must be an array.')
      }

      let cachedRes
      if (typeof memos[currentMemoIndex] === 'undefined') {
        cachedRes = fn()
        memos[currentMemoIndex] = {
          cachedRes: cachedRes,
          deps: deps || [],
        }
      } else {
        let lastDeps = memos[currentMemoIndex]['deps']
        let isUpdated = isDepsUpdated(deps, lastDeps)
        if (isUpdated) {
          cachedRes = fn()
          memos[currentMemoIndex]['cachedRes'] = cachedRes
        } else {
          cachedRes = memos[currentMemoIndex]['cachedRes']
        }
      }
      currentMemoIndex++
      return cachedRes
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

  const memo1 = ReactHooks.useMemo(() => {
    return num2 + 100
  }, [num2])

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
      console.log('Count.render', { num1, num2, memo1 })
    },
  }
}

let comp1 = ReactHooks.render(Count)
comp1.click1()

comp1 = ReactHooks.render(Count)
comp1.click2()

comp1 = ReactHooks.render(Count)
