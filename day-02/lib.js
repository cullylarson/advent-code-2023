import {compose, trim, split, map, get, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const stringToCubes = (str) => {
  const parts = str.split(' ')

  return {
    num: toInt(undefined, parts[0]),
    color: parts[1],
  }
}

const combineCubes = (cubes) => {
  return cubes.reduce((acc, x) => ({
    ...acc,
    [x.color]: x.num,
  }), {
    red: 0,
    green: 0,
    blue: 0,
  })
}

export const readInput = filename => then(compose(
  map(map(combineCubes)),
  map(map(map(stringToCubes))),
  map(map(map((trim)))),
  map(map(split(','))),
  map(split(';')),
  map(get(1, [])),
  map(split(':')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
