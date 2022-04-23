/**
 * Direction
 * Divide students to all of groups & students must sorted by first name
 *
 * Expected Result
 * [
 *   [
 *     { "firstName": "Belle", "lastName": "Norton" },
 *     { "firstName": "Finnley", "lastName": "Rennie" }
 *   ],
 *   [
 *     { "firstName": "Kai", "lastName": "Lyons" },
 *     { "firstName": "Peyton", "lastName": "Gardner" }
 *   ],
 *   [{ "firstName": "Tatiana", "lastName": "Dickerson" }]
 * ]
 */

interface Student {
  firstName: string
  lastName: string
}

const students = [
  { firstName: 'Kai', lastName: 'Lyons' },
  { firstName: 'Belle', lastName: 'Norton' },
  { firstName: 'Finnley', lastName: 'Rennie' },
  { firstName: 'Tatiana', lastName: 'Dickerson' },
  { firstName: 'Peyton', lastName: 'Gardner' },
]
const groups = 3

function result5(students: Student[], groups: number) {
  // sorted array
  students.sort((a, b) => a.firstName.localeCompare(b.firstName))

  // Temporary array
  const final = []

  // maks number of group
  const groupSize = Math.ceil(students.length / groups)

  // clone array students
  const queue = students.slice(0)

  for (let i = 0; i < groups; i++) {
    // slice array into group
    final.push(queue.splice(0, groupSize))
  }

  return final
}

console.log(result5(students, groups))
