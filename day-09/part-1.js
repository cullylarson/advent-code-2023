import {compose, report, map, last, head} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, diffLineToZero} from './lib.js'
import {rel, sum} from '../lib.js'

const fillLastLineElements = (items) => {
  if(items.length < 2) {
    throw Error('Fewer than two items.')
  }

  items[items.length - 1].push(0)

  let previousLastElement = 0

  for(let i = items.length - 2; i >= 0; i--) {
    const lastElement = last(items[i])
    const newLastElement = previousLastElement + lastElement

    items[i].push(newLastElement)

    previousLastElement = newLastElement
  }

  return items
}

then(compose(
  report,
  sum,
  map(last),
  map(head),
  map(fillLastLineElements),
  map(diffLineToZero),
), readInput(rel(import.meta.url, 'input.txt')))
