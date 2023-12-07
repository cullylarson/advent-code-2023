import {compose, report, curry, set} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const seedListToRanges = xs => {
  let totalLength = 0 // stub
  const ranges = []

  for(let i = 0; i < xs.length; i += 2) {
    ranges.push({
      start: xs[i],
      length: xs[i + 1],
    })

    totalLength += xs[i + 1] // stub
  }

  console.log(totalLength) // stub

  return ranges
}

const applyMap = curry((map, key) => {
  if(key === undefined) {
    return undefined
  }

  const nextKey = map.reduce((acc, x) => {
    if(acc !== undefined) {
      return acc
    }
    else if(x.source.start <= key && x.source.end >= key) {
      return x.dest.start + key - x.source.start
    }
    else {
      return undefined
    }
  }, undefined)

  return nextKey === undefined ? key : nextKey
})

const applyMaps = (seed, maps) => {
  return compose(
    applyMap(maps['humidity-to-location']),
    applyMap(maps['temperature-to-humidity']),
    applyMap(maps['light-to-temperature']),
    applyMap(maps['water-to-light']),
    applyMap(maps['fertilizer-to-water']),
    applyMap(maps['soil-to-fertilizer']),
    applyMap(maps['seed-to-soil']),
  )(seed)
}

const applySeeds = ({seeds, ...maps}) => {
  let lowest

  console.log('Ranges:', seeds.length)
  for(const seedDef of seeds) {
    console.log(seedDef)
    for(let i = 0; i < seedDef.length; i++) {
      const seed = seedDef.start + i
      if(seed % 1000000 === 0) {
        console.log(seed, '/', seedDef.start + seedDef.length - 1)
      }
      const value = applyMaps(seed, maps)

      if(lowest === undefined || value < lowest) {
        lowest = value
      }
    }
  }

  return lowest
}

then(compose(
  report,
  applySeeds,
  x => set('seeds', seedListToRanges(x.seeds), x),
), readInput(rel(import.meta.url, 'input.txt')))
