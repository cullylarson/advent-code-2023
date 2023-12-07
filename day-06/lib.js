import {compose, trim, split, map, filter, tail} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const listsToEntries = ([times, distances]) => {
  if(times.length !== distances.length) throw Error("Lengths don't match.")

  const entries = []

  for(let i = 0; i < times.length; i++) {
    entries.push({time: times[i], distance: distances[i]})
  }

  return entries
}

export const readInput = filename => then(compose(
  listsToEntries,
  map(tail),
  map(filter(Boolean)),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
