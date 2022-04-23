/**
 * Direction:
 * Find all fields that have different value & must can detect all field dynamically
 *
 * Expected Result:
 * ['firstName', 'lastName']
 *
 */

const data = [
  { firstName: 'Adi', lastName: 'Nugroho', age: 25 },
  { firstName: 'Deddy', lastName: 'Dores', age: 25 },
]

function result3(data: any) {
  // Take first data for base comparing
  const compare = data[0]

  // Temporary array
  const temp = []

  // Get keys base data
  let sourceKeys = compare && Object.keys(compare)

  for (const value of data) {
    let valueKeys = Object.keys(value)

    // make sure length keys are same
    if ( sourceKeys.length !== valueKeys.length ) return false

    // make sure object keys are same
    if ( !sourceKeys.every((key: any) => valueKeys.indexOf(key) >= 0)) return false

    // compare keys
    for (const val of sourceKeys) {
      if (compare[val] !== value[val]) {
        temp.push(val)
      }
    }
  }

  // remove duplicate
  const final = [... new Set(temp)]

  return final
}

console.log(result3(data))
