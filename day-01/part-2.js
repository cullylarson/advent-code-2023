import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, arrToNumber} from './lib.js'
import {rel, sum} from '../lib.js'

const indexOfStr = (where, search, subject) => where === 'first' ? subject.indexOf(search) : subject.lastIndexOf(search)

// get the index of the value found by comparing all values
const indexOfComparision = (compare, xs) => {
  let value

  for(let i = 0; i < xs.length; i++) {
    const x = xs[i]

    if(x !== undefined && (value === undefined || compare(x, value.value))) {
      value = {index: i, value: x}
    }
  }

  return value === undefined ? undefined : value.index
}

const findNumber = (where, subject) => {
  const numberStrings = [
    ['one', 1],
    ['1', 1],
    ['two', 2],
    ['2', 2],
    ['three', 3],
    ['3', 3],
    ['four', 4],
    ['4', 4],
    ['five', 5],
    ['5', 5],
    ['six', 6],
    ['6', 6],
    ['seven', 7],
    ['7', 7],
    ['eight', 8],
    ['8', 8],
    ['nine', 9],
    ['9', 9],
  ]

  const indexOfNumbers = numberStrings
    .map(x => indexOfStr(where, x[0], subject))
    .map(x => x === -1 ? undefined : x)

  const indexOfNumber = where === 'first'
    ? indexOfComparision((index, currentLeast) => index < currentLeast, indexOfNumbers)
    : indexOfComparision((index, currentGreatest) => index > currentGreatest, indexOfNumbers)

  if(indexOfNumber === undefined) {
    throw Error('Could not find a number in subject: ', subject)
  }

  return numberStrings[indexOfNumber][1]
}

then(compose(
  report,
  sum,
  map(arrToNumber),
  map(x => [
    findNumber('first', x),
    findNumber('last', x),
  ]),
), readInput(rel(import.meta.url, 'input.txt')))
