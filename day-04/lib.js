import {compose, trim, split, map, get, toInt, filter} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  map(map(map((toInt(undefined))))),
  map(map(filter(Boolean))),
  map(map(split(' '))),
  map(map(trim)),
  map(split('|')),
  map(get(1, undefined)),
  map(split(':')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
