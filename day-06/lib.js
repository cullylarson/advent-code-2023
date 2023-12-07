import {compose, trim, split, map, filter, tail} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const getNumWins = ({time, distance}) => {
  let numWins = 0

  for(let holdTime = 1; holdTime < time; holdTime++) {
    const speed = holdTime
    const timeLeft = time - holdTime

    const traveled = speed * timeLeft

    if(traveled > distance) {
      // console.log({speed, traveled, time, timeLeft})
      numWins++
    }
  }

  return numWins
}

export const readInput = filename => then(compose(
  map(tail),
  map(filter(Boolean)),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
