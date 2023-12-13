import {compose, trim, split, map, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  map(x => [x]),
  map(map(toInt(undefined))),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
