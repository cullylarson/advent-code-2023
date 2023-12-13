import {compose, report, map, last, head} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const allZero = xs => xs.length > 0 && xs[0] === 0 && new Set(xs).size === 1

const diffLastItem = (items) => {
  const item = last(items)

  const newItem = []

  for(let i = 0; i < item.length - 1; i++) {
    const thisElement = item[i]
    const nextElement = item[i + 1]

    newItem.push(nextElement - thisElement)
  }

  return newItem
}

const diffLineToZero = (items) => {
  while(true) {
    const newItem = diffLastItem(items)
    items = [...items, newItem]

    if(allZero(newItem)) {
      return items
    }
  }
}

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
