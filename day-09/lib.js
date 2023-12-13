import {compose, trim, split, map, toInt, last} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

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

export const diffLineToZero = (items) => {
  while(true) {
    const newItem = diffLastItem(items)
    items = [...items, newItem]

    if(allZero(newItem)) {
      return items
    }
  }
}

export const readInput = filename => then(compose(
  map(x => [x]),
  map(map(toInt(undefined))),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
