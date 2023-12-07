import {compose, report, curry, set} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const seedListToRanges = xs => {
  const ranges = []

  for(let i = 0; i < xs.length; i += 2) {
    ranges.push({
      start: xs[i],
      end: xs[i] + xs[i + 1] - 1,
    })
  }

  return ranges
}

const applyMapReverse = curry((map, key) => {
  if(key === undefined) {
    return undefined
  }

  const nextKey = map.reduce((acc, x) => {
    if(acc !== undefined) {
      return acc
    }
    else if(x.dest.start <= key && x.dest.end >= key) {
      return x.source.start + key - x.dest.start
    }
    else {
      return undefined
    }
  }, undefined)

  return nextKey === undefined ? key : nextKey
})

const applyMaps = (key, maps) => {
  return compose(
    applyMapReverse(maps['seed-to-soil']),
    applyMapReverse(maps['soil-to-fertilizer']),
    applyMapReverse(maps['fertilizer-to-water']),
    applyMapReverse(maps['water-to-light']),
    applyMapReverse(maps['light-to-temperature']),
    applyMapReverse(maps['temperature-to-humidity']),
  )(key)
}

const isSeed = (seeds, seed) => {
  return seeds.some(x => x.start <= seed && x.end >= seed)
}

const applySeeds = ({seeds, ...maps}) => {
  let lowest

  const humidityToLocations = maps['humidity-to-location']

  humidityToLocations.sort((a, b) => {
    return a.dest.start - b.dest.start
  })

  for(const humidityToLocation of humidityToLocations) {
    for(let location = humidityToLocation.dest.start; location <= humidityToLocation.dest.end; location++) {
      const seed = applyMaps(location, maps)

      if(isSeed(seeds, seed) && (lowest === undefined || location < lowest)) {
        lowest = location
      }
    }
  }

  return lowest
}

then(compose(
  report,
  // min,
  applySeeds,
  x => set('seeds', seedListToRanges(x.seeds), x),
), readInput(rel(import.meta.url, 'input.txt')))
