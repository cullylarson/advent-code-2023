import {compose, trim, split, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const lineToDeal = ([handStr, bid]) => {
  const hand = handStr.split('')

  return {
    hand,
    bid: Number(bid),
  }
}

export const readInput = filename => then(compose(
  map(lineToDeal),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
