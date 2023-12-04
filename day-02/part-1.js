import {compose, report, map, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const TOTALS = {
  red: 12,
  green: 13,
  blue: 14,
}

const stringToCubes = (str) => {
  const parts = str.split(' ')

  return {
    num: toInt(undefined, parts[0]),
    color: parts[1],
  }
}

const combineCubes = (cubes) => {
  return cubes.reduce((acc, x) => ({
    ...acc,
    [x.color]: x.num,
  }), {
    red: 0,
    green: 0,
    blue: 0,
  })
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
  map(map(combineCubes)),
  map(map(map(stringToCubes))),
), readInput(rel(import.meta.url, 'input.txt')))
