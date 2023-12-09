import {compose, trim, split, map, reduce} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const parseInstructions = compose(
  split(''),
)

const parseNode = ([location, directionsStr]) => {
  const directions = directionsStr
    .replace('(', '')
    .replace(')', '')
    .split(', ')

  return {
    [location]: {L: directions[0], R: directions[1]},
  }
}

const parseNetwork = compose(
  reduce((acc, x) => ({
    ...acc,
    ...parseNode(x),
  }), {}),
  map(split(' = ')),
  split('\n'),
)

const parseInput = ([instructionsStr, networkString]) => ({
  instructions: parseInstructions(instructionsStr),
  network: parseNetwork(networkString),
})

export const readInput = filename => then(compose(
  parseInput,
  split('\n\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
