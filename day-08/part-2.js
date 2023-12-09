import {Worker, isMainThread, parentPort, workerData} from 'node:worker_threads'
import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, max} from '../lib.js'

const isDone = location => location.endsWith('Z')

// all done when all locationItems have the same number of steps
const isAllDone = locationItems => {
  return Array.from(new Set(locationItems.map(x => x.steps))).length === 1
}

const runLocationItem = async (maxSteps, locationItem) => {
  if(maxSteps !== 0 && locationItem.steps >= maxSteps) {
    return locationItem
  }

  return new Promise((resolve, reject) => {
    const worker = new Worker('./part-2.js', {
      workerData: locationItem,
    })

    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}

const runLocationItems = async (locationItems) => {
  const maxSteps = max(locationItems.map(x => x.steps))

  return Promise.all(locationItems.map(locationItem => runLocationItem(maxSteps, locationItem)))
}

const followInstructions = async ({instructions, network}) => {
  const nodes = Object.keys(network)

  let locationItems = nodes
    .filter(x => x.endsWith('A'))
    .map(x => ({
      i: -1,
      location: x,
      instructions,
      network,
      steps: 0,
    }))

  do {
    locationItems = await runLocationItems(locationItems)
    console.log(locationItems.map(x => x.steps)) // stub
  } while(!isAllDone(locationItems))

  return locationItems[0].steps
}

const followInstructionForOneLocation = ({i, location, instructions, network, steps}) => {
  do {
    i++

    if(i >= instructions.length) {
      i = 0
    }

    const instruction = instructions[i]

    location = network[location][instruction]

    steps++
  } while(!isDone(location))

  return {i, location, instructions, network, steps}
}

if(isMainThread) {
  then(compose(
    then(report),
    followInstructions,
  ), readInput(rel(import.meta.url, 'input.txt')))
}
else {
  const result = followInstructionForOneLocation(workerData)

  parentPort.postMessage(result)
}
