/**
 * Direction:
 * Swap these numbers without using temporary variable
 *
 * Expected Result:
 * {
 *  a: 4,
 *  b: 2
 * }
 */

interface Numbers {
    a: number
    b: number
}

let numbers = {
  a: 2,
  b: 4,
}

function result(numbers: Numbers) {
  // assign new a
  numbers.a += numbers.b

  // assign value a to b
  numbers.b = numbers.a - numbers.b

  // assing value b to a
  numbers.a = numbers.a - numbers.b

  return numbers
}

console.log(result(numbers))
