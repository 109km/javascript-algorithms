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

const state1 = createState(1)
const state2 = createState(2)
const [num1, setNum1] = state1()
const [num2, setNum2] = state2()
setNum1(2)
setNum2(6)
console.log('After setState:', num1(), num2())
