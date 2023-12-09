import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const followInstruction = (location, instruction, network) => network[location][instruction]

const isAllDone = locations => locations.every(x => x.endsWith('Z'))

const followInstructions = ({instructions, network}) => {
  const nodes = Object.keys(network)

  let locations = nodes.filter(x => x.endsWith('A'))

  let i = 0
  let steps = 0

  while(!isAllDone(locations)) {
    const instruction = instructions[i]

    i++

    if(i >= instructions.length) {
      i = 0
    }

    locations = locations.map(location => followInstruction(location, instruction, network))

    steps++
  }

  return steps
}

then(compose(
  report,
  followInstructions,
), readInput(rel(import.meta.url, 'input.txt')))
