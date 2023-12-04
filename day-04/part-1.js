import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const getNumMatching = ([winning, mine]) => {
  return compose(
    sum,
    map(x => winning.includes(x) ? 1 : 0),
  )(mine)
}

const getPoints = numWon => numWon === 0 ? 0 : Math.pow(2, numWon - 1)

then(compose(
  report,
  sum,
  map(getPoints),
  map(getNumMatching),
), readInput(rel(import.meta.url, 'input.txt')))
