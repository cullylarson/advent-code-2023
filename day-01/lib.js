import {compose, trim} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  trim,
), readFile(filename, {encoding: 'utf8'}))
