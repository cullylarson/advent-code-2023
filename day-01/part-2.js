import {compose, report, map, filter, toInt, split, curry} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, toFirstLast, arrToNumber} from './lib.js'
import {rel, sum} from '../lib.js'

const indexOfStr = (search, subject) => subject.indexOf(search)

// get the index of the value found by comparing all values
const indexOfComparision = (compare, xs) => {
  let least

  for(let i = 0; i < xs.length; i++) {
    const x = xs[i]

    if(x !== undefined && (least === undefined || compare(x, least.value))) {
      least = {index: i, value: x}
    }
  }

  return least === undefined ? undefined : least.index
}

const replaceOccurrence = (where, search, replace, subject) => {
  const index = where === 'last' ? subject.lastIndexOf(search) : subject.indexOf(search)

  if(index === -1) {
    return subject
  }

  return subject.substring(0, index)
    + replace
    + subject.substring(index + search.length)
}

const replaceNumberStrings = curry((where, subject) => {
  const numberStrings = [
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
  ]

  const indexOfNumbers = numberStrings
    .map(x => indexOfStr(x[0], subject))
    .map(x => x === -1 ? undefined : x)

  const indexOfNumber = where === 'first'
    ? indexOfComparision((index, currentLeast) => index < currentLeast, indexOfNumbers)
    : indexOfComparision((index, currentGreatest) => index > currentGreatest, indexOfNumbers)

  if(indexOfNumber === undefined) {
    return subject
  }

  const numberToReplace = numberStrings[indexOfNumber]

  return replaceOccurrence(where, numberToReplace[0], numberToReplace[1], subject)
})

then(compose(
  report,
  sum,
  map(arrToNumber),
  report,
  map(toFirstLast),
  map(filter(x => x !== undefined)),
  map(map(toInt(undefined))),
  map(split('')),
  report,
  map(replaceNumberStrings('last')),
  map(replaceNumberStrings('first')),
  report,
), readInput(rel(import.meta.url, 'sample-part-2.txt')))
