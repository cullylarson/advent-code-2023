import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const followInstructions = ({instructions, network}) => {
  let location = 'AAA'
  let i = 0
  let steps = 0

  while(location !== 'ZZZ') {
    const instruction = instructions[i]

    i++

    if(i >= instructions.length) {
      i = 0
    }

    location = network[location][instruction]
    steps++
  }

  return steps
}

then(compose(
  report,
  followInstructions,
), readInput(rel(import.meta.url, 'input.txt')))
