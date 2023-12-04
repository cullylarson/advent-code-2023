import {compose, trim, split, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  map(split('')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
