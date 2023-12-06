import {compose, report, curry} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, min} from '../lib.js'

const applyMap = curry((map, key) => {
  const nextKey = map.reduce((acc, x) => {
    if(acc !== undefined) {
      return acc
    }
    else if(x.source.start <= key && x.source.end >= key) {
      return x.destStart + key - x.source.start
    }
    else {
      return undefined
    }
  }, undefined)

  return nextKey === undefined ? key : nextKey
})

const applyMaps = ({seeds, ...maps}) => {
  return seeds.map(compose(
    applyMap(maps['humidity-to-location']),
    applyMap(maps['temperature-to-humidity']),
    applyMap(maps['light-to-temperature']),
    applyMap(maps['water-to-light']),
    applyMap(maps['fertilizer-to-water']),
    applyMap(maps['soil-to-fertilizer']),
    applyMap(maps['seed-to-soil']),
  ))
}

then(compose(
  report,
  min,
  applyMaps,
), readInput(rel(import.meta.url, 'input.txt')))
