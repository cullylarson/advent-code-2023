import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const getMaxColors = (sets) => {
  return sets.reduce((acc, x) => {
    return {
      ...acc,
      red: Math.max(acc.red, x.red),
      green: Math.max(acc.green, x.green),
      blue: Math.max(acc.blue, x.blue),
    }
  }, {
    red: 0,
    green: 0,
    blue: 0,
  })
}

const getPower = (totals) => totals.red * totals.green * totals.blue

then(compose(
  report,
  sum,
  map(getPower),
  map(getMaxColors),
), readInput(rel(import.meta.url, 'input.txt')))
