/**
 * Direction:
 * - combine the data between numbersOne and numberTwo and get the deleted data between originalData and the result of merge
 * - divide the data between total value of numbersOne and numbersTwo that already merge, and total value of deletedData
 *
 * Expected Result:
 * 2.21
 */

let originalData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let numbersOne = [3, 4, 5, 7, 9]
let numbersTwo = [1, 2, 3, 5, 9]

function result2(
  originalData: number[],
  numbersOne: number[],
  numbersTwo: number[]
) {
  // Combine data
  const combinedNumber = [...numbersOne, ...numbersTwo]

  // Deleted Data 
  const deletedData = originalData.filter(
    (value) => combinedNumber.indexOf(value) < 0
  )

  // total combine data
  const totalMerge = combinedNumber.reduce((prev, curr) => prev + curr)
  // total deleted data 
  const totalDeleted = deletedData.reduce((prev, curr) => prev + curr)

  const totalValue = totalMerge/totalDeleted
  return totalValue
}

console.log(result2(originalData, numbersOne, numbersTwo))
