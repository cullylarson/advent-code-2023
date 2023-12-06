import {compose, trim, split, map, get, tail, reduce, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const parseSeeds = compose(
  map(toInt(undefined)),
  split(' '),
  trim,
  get(1, ''),
  split(':'),
)

const parseMapLine = mapLineStr => {
  const [destStart, sourceStart, length] = mapLineStr.split(' ').map(toInt(undefined))

  const result = {}

  for(let i = 0; i < length; i++) {
    result[sourceStart + i] = destStart + i
  }

  return result
}

const parseMap = reduce((acc, x) => ({
  ...acc,
  ...parseMapLine(x),
}), {})

const getMapKey = compose(
  get(0, undefined),
  split(' '),
)

export const readInput = filename => then(compose(
  x => ({
    seeds: parseSeeds(x[0][0]),
    ...tail(x).reduce((acc, y) => ({
      ...acc,
      [getMapKey(y[0])]: parseMap(tail(y)),
    }), {}),
  }),
  map(split('\n')),
  split('\n\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
