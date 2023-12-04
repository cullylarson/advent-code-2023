import {compose, trim, split, map, get} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  map(map(map((trim)))),
  map(map(split(','))),
  map(split(';')),
  map(get(1, [])),
  map(split(':')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
