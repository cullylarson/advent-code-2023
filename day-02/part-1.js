import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const TOTALS = {
  red: 12,
  green: 13,
  blue: 14,
}

const isPossible = (totals) => {
  return totals.red <= TOTALS.red
    && totals.green <= TOTALS.green
    && totals.blue <= TOTALS.blue
}

const allPossible = (games) => {
  return !games.some(x => !isPossible(x))
}

const sumPossibleIds = (results) => {
  let sum = 0

  for(let i = 0; i < results.length; i++) {
    if(results[i]) {
      sum += i + 1
    }
  }

  return sum
}

then(compose(
  report,
  sumPossibleIds,
  map(allPossible),
), readInput(rel(import.meta.url, 'input.txt')))
