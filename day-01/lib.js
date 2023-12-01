import {compose, trim, split} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))

export const toFirstLast = (xs) => {
  return [
    xs[0],
    xs[xs.length - 1],
  ]
}

export const arrToNumber = (xs) => {
  let unit = 1
  let number = 0

  for(let i = xs.length - 1; i >= 0; i--) {
    const x = xs[i]
    number += x * unit
    unit *= 10
  }

  return number
}
