import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, mult} from '../lib.js'

const getNumWins = ({time, distance}) => {
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

then(compose(
  report,
  mult,
  map(getNumWins),
), readInput(rel(import.meta.url, 'input.txt')))
