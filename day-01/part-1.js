import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

then(compose(
  report,
), readInput(rel(import.meta.url, 'input.txt')))
