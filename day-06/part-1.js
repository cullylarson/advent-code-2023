import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getNumWins} from './lib.js'
import {rel, mult} from '../lib.js'

const listsToEntries = ([times, distances]) => {
  if(times.length !== distances.length) throw Error("Lengths don't match.")

  const entries = []

  for(let i = 0; i < times.length; i++) {
    entries.push({time: times[i], distance: distances[i]})
  }

  return entries
}

then(compose(
  report,
  mult,
  map(getNumWins),
  listsToEntries,
), readInput(rel(import.meta.url, 'input.txt')))
