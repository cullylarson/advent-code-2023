import {compose, report, map, filter, toInt, split} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, toFirstLast, arrToNumber} from './lib.js'
import {rel, sum} from '../lib.js'

then(compose(
  report,
  sum,
  map(arrToNumber),
  map(toFirstLast),
  map(filter(x => x !== undefined)),
  map(map(toInt(undefined))),
  map(split('')),
), readInput(rel(import.meta.url, 'input.txt')))
