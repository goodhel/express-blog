/**
 * Direction:
 * Find all fields that have different value & must can detect all field dynamically
 *
 * Expected Result:
 * ['firstName', 'lastName']
 *
 */

interface Data {
    firstName: string
    lastName: string
    age: number
}

const data = [
  { firstName: 'Adi', lastName: 'Nugroho', age: 25 },
  { firstName: 'Deddy', lastName: 'Dores', age: 25 },
]

function result3(data: any) {
  // your code here
  for (const value of data) {
      const val = Object.values(value)
      console.log(val)
    //   const key = Object.keys(value)
    //   console.log(key)
  }
}

console.log(result3(data))
