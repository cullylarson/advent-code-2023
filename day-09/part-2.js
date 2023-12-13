import {compose, report, map, head} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, diffLineToZero} from './lib.js'
import {rel, sum} from '../lib.js'

const fillFirstLineElements = (items) => {
  if(items.length < 2) {
    throw Error('Fewer than two items.')
  }

  items[items.length - 1].push(0)

  let previousFirstElement = 0

  for(let i = items.length - 2; i >= 0; i--) {
    const firstElement = head(items[i])
    const newFirstElement = firstElement - previousFirstElement

    items[i].unshift(newFirstElement)

    previousFirstElement = newFirstElement
  }

  return items
}

then(compose(
  report,
  sum,
  map(head),
  map(head),
  map(fillFirstLineElements),
  map(diffLineToZero),
), readInput(rel(import.meta.url, 'input.txt')))
