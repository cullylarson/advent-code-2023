import {compose, report, map, filter, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const toFirstLast = (xs) => {
  return [
    xs[0],
    xs[xs.length - 1],
  ]
}

const arrToNumber = (xs) => {
  let unit = 1
  let number = 0

  for(let i = xs.length - 1; i >= 0; i--) {
    const x = xs[i]
    number += x * unit
    unit *= 10
  }

  return number
}

then(compose(
  report,
  sum,
  map(arrToNumber),
  map(toFirstLast),
  map(filter(x => x !== undefined)),
  map(map(toInt(undefined))),
), readInput(rel(import.meta.url, 'input.txt')))
