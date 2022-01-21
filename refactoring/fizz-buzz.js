/**
 * @description Here are 500 students, they stand in a line, and start
 * to count from 1 to 500. But every 3rd student counts "Fizz", and every
 * 5th student counts "Buzz".
 */

/**
 * @problem1
 * How to handle the case when the number can be divided by 3 and 5 like 15 ?
 * This is a problem of bussiness logic.
 * So we need to make the logic more clear.
 */

/**
 * @solution1
 * Communicate with PM to confirm the logic.
 * Let's assume the number is like 15, then we can say: "FizzBuzz".
 */

/**
 * @version1
 * But this solution has some problems:
 * 1. Wrong logic. The number can be divided by 3 and 5
 * can't go to the right conditional branch:
 * the number can be divided by both 3 and 5 will always go to
 * the "Fizz" branch, cause the "Fizz" branch comes first.
 *
 * 2. Hard to debug. All logics are in one place.
 * And there is no input and output. The result is printed in the console.
 *
 * Now let's try to refactor the code.
 */

function version1() {
  for (let i = 1; i <= 500; i++) {
    if (i % 3 === 0) {
      console.log('Fizz')
    } else if (i % 5 === 0) {
      console.log('Buzz')
    } else if (i % 3 === 0 && i % 5 === 0) {
      console.log('FizzBuzz')
    } else {
      console.log(i)
    }
  }
}

/**
 * @version2
 * Now we correct the logic and split the whole logic to two parts:
 * `for` loop and single number's logic.
 * And also single number's logic is moved to a function.
 * It has an input and an output.
 */

function version2() {
  for (let i = 1; i <= 500; i++) {
    console.log(fizzBuzz(i))
  }
  function fizzBuzz(i) {
    if (i % 3 === 0 && i % 5 === 0) {
      return 'FizzBuzz'
    }
    if (i % 3 === 0) {
      return 'Fizz'
    }
    if (i % 5 === 0) {
      return 'Buzz'
    }
    return i
  }
}

/**
 * @problem2
 * Let's add one more condition:
 * If the number can be divided by 7, we say "Bang".
 * So here are some cases:
 * 1. 21 -> "FizzBang"
 * 2. 35 -> "BuzzBang"
 * 3. 105 -> "FizzBuzzBang"
 */

/**
 * @version3
 * Now this solution absolutely works.
 * But as we can see, the code is very long and hard to read.
 * What if we need to add more conditions?
 * So is there any way to refactor the code?
 */

function version3() {
  for (let i = 1; i <= 500; i++) {
    console.log(fizzBuzz(i))
  }
  function fizzBuzz(i) {
    if (i % 3 === 0 && i % 5 === 0 && i % 7 === 0) {
      return 'FizzBuzzBang'
    }
    if (i % 5 === 0 && i % 7 === 0) {
      return 'BuzzBang'
    }
    if (i % 3 === 0 && i % 7 === 0) {
      return 'FizzBang'
    }
    if (i % 3 === 0 && i % 5 === 0) {
      return 'FizzBuzz'
    }
    if (i % 5 === 0) {
      return 'Buzz'
    }
    if (i % 3 === 0) {
      return 'Fizz'
    }
    return i
  }
}

/**
 * @solution2
 * Now the problem is not about bussiness logic,
 * the PMs and users don't care about whether the code is clear or not,
 * they only care that the product works right.
 *
 * Let's introduce a concept: cyclomatic complexity.
 * Here is the rule of computing cyclomatic complexity:
 * 1. Each `for` or `while` statement add 1 complexity.
 * 2. Each `if` or `else` or `else if` statement add 1 complexity.
 * 3. Each `break` or `continue` or `return` statement add 1 complexity.
 *
 * So the total complexity of the code of version3 is 14.
 * According to some testing results, the cyclomatic complexity and
 * bug rate per thousand lines of code have a correlation rate as high
 * as 90%.
 * Though correlation is not causality, we still need to pay attention to
 * the cyclomatic complexity.
 *
 * Here are 4 steps to refactor the code:
 * 1. Wrap the old code into a function.
 * 2. Test the logic with this function.
 * 3. Refactor this function.
 * 4. Test the logic with the new function.
 *
 * The key point is to make the old code into a funciton,
 * so it has inputs and outputs. So the other part of code must
 * interactive with this part of code in function way.
 * It means the denpendency relationship is changed from process to data.
 *
 * Data dependency is more clear than process dependency. This is saying
 * a part code only needs to know another part code's inputs and outputs.
 */

/**
 * @version4
 * Step 1: Wrap the old code into a function.
 */

function version4_step1() {
  for (let i = 1; i <= 500; i++) {
    console.log(fizzBuzz(i))
  }

  // Here is the part that we need to refactor.
  function fizzBuzz(i) {
    const result = fizzBuzzNew(i)
    return result
  }
  // Just wrap the old code into a function.
  function fizzBuzzNew(i) {
    if (i % 3 === 0 && i % 5 === 0 && i % 7 === 0) {
      return 'FizzBuzzBang'
    }
    if (i % 5 === 0 && i % 7 === 0) {
      return 'BuzzBang'
    }
    if (i % 3 === 0 && i % 7 === 0) {
      return 'FizzBang'
    }
    if (i % 3 === 0 && i % 5 === 0) {
      return 'FizzBuzz'
    }
    if (i % 5 === 0) {
      return 'Buzz'
    }
    if (i % 3 === 0) {
      return 'Fizz'
    }
    return i
  }
}

/**
 * @version4
 * Step 2: Test the logic with this function.
 * Just run the function to see if it works.
 */

/**
 * @version4
 * Step 3: Refactor this function.
 */

function version4_step3() {
  for (let i = 1; i <= 500; i++) {
    console.log(fizzBuzz(i))
  }

  // Here is the part that we need to refactor.
  function fizzBuzz(i) {
    const result = fizzBuzzNew(i)
    return result
  }
  // Refactor the old code, we only need to
  // take care of the inputs and outputs.
  // In this case input is a number, and output is a string.
  function fizzBuzzNew(i) {
    let result = ''
    if (i % 3 === 0) {
      result += 'Fizz'
    }
    if (i % 5 === 0) {
      result += 'Buzz'
    }
    if (i % 7 === 0) {
      result += 'Bang'
    }
    return result
  }
}

/**
 * @version4
 * Step 4: Test the logic with the new function.
 * And remove some unnecessary code.
 * And we notice that the loop part of code is not changed, and it
 * doesn't know what happened with `fizzBuzz` at all.
 */

function version4_step4() {
  for (let i = 1; i <= 500; i++) {
    console.log(fizzBuzz(i))
  }
  function fizzBuzz(i) {
    let result = ''
    if (i % 3 === 0) {
      result += 'Fizz'
    }
    if (i % 5 === 0) {
      result += 'Buzz'
    }
    if (i % 7 === 0) {
      result += 'Bang'
    }
    return result
  }
}

/**
 * @version4
 * At last we can add a little more change to the code:
 * make the number of students more flexible.
 */

function version4_final(total) {
  for (let i = 1; i <= total; i++) {
    console.log(fizzBuzz(i))
  }
  function fizzBuzz(i) {
    let result = ''
    if (i % 3 === 0) {
      result += 'Fizz'
    }
    if (i % 5 === 0) {
      result += 'Buzz'
    }
    if (i % 7 === 0) {
      result += 'Bang'
    }
    return result
  }

  // test
  function test_should_return_Fizz_given_input_can_be_divided_by_3() {
    const tests = [9, 21, 102]
    let isPassed = false
    for (let i = 0; i < tests.length; i++) {
      if (fizzBuzz(tests[i]) !== 'Fizz') {
        isPassed = false
        console.error(
          `test_should_return_Buzz_given_input_can_be_divided_by_5 at ${tests[i]}`,
        )
        break
      }
    }
    console.log(
      'test_should_return_Fizz_given_input_can_be_divided_by_3 passed',
    )
  }
  function test_should_return_Buzz_given_input_can_be_divided_by_5() {
    const tests = [5, 20, 55, 200]
    let isPassed = false
    for (let i = 0; i < tests.length; i++) {
      if (fizzBuzz(tests[i]) !== 'Buzz') {
        isPassed = false
        console.error(
          `test_should_return_Buzz_given_input_can_be_divided_by_5 failed at ${tests[i]}`,
        )
        break
      }
    }
    console.log(
      'test_should_return_Buzz_given_input_can_be_divided_by_5 passed',
    )
  }
  test_should_return_Fizz_given_input_can_be_divided_by_3()
  test_should_return_Buzz_given_input_can_be_divided_by_5()
}

/**
 * @Summary
 * As we can see, the code is very clear and easy to read.
 * And the ciclomatic complexity is reduced from 14 to 5, wow!
 * We can also control the student's number by changing the parameter.
 *
 * Another point we need to notice is: test after each step.
 * An important theory in software engineering is later a bug is found, more cost is spent.
 * To avoid this, we can write some test cases just after each step.
 */
