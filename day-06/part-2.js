import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getNumWins} from './lib.js'
import {rel} from '../lib.js'

const listsToEntry = ([times, distances]) => {
  return {
    time: parseInt(times.join('')),
    distance: parseInt(distances.join('')),
  }
}

then(compose(
  report,
  getNumWins,
  listsToEntry,
), readInput(rel(import.meta.url, 'input.txt')))
