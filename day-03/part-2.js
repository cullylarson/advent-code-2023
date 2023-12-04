import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const isGearSymbol = (value) => {
  return value === '*'
}

const isGearSymbolSquare = (board, y, x) => {
  if(y < 0) return false
  if(x < 0) return false
  if(y >= board.length) return false
  if(x >= board[y].length) return false

  return isGearSymbol(board[y][x])
}

const getAdjacentGearCoords = (board, y, x) => {
  const possibleCords = [
    [y - 1, x - 1], // upper left
    [y - 1, x], // above
    [y - 1, x + 1], // upper right
    [y, x + 1], // right
    [y + 1, x + 1], // lower right
    [y + 1, x], // below
    [y + 1, x - 1], // lower left
    [y, x - 1], // left
  ]

  for(const coord of possibleCords) {
    if(isGearSymbolSquare(board, coord[0], coord[1])) {
      return coord
    }
  }

  return undefined
}

const pushValueAt = (subject, y, x, value) => {
  if(!subject[y]) {
    subject[y] = []
  }

  if(!subject[y][x]) {
    subject[y][x] = []
  }

  subject[y][x].push(value)
}

const getGearAdjacentPartNumbers = (board) => {
  const gearSymbolNumbers = []

  for(let y = 0; y < board.length; y++) {
    let numberStr = ''
    let adjacentGearCoords

    for(let x = 0; x < board[y].length; x++) {
      const square = board[y][x]

      // end of number
      if(square === '.' || isGearSymbol(square)) {
        if(numberStr !== '' && adjacentGearCoords) {
          pushValueAt(gearSymbolNumbers, adjacentGearCoords[0], adjacentGearCoords[1], parseInt(numberStr))
        }

        numberStr = ''
        adjacentGearCoords = undefined
      }
      else {
        numberStr += square

        const maybeAdjacentGearCoords = getAdjacentGearCoords(board, y, x)

        if(maybeAdjacentGearCoords) {
          adjacentGearCoords = maybeAdjacentGearCoords
        }
      }
    }

    // end of line
    if(numberStr !== '' && adjacentGearCoords) {
      pushValueAt(gearSymbolNumbers, adjacentGearCoords[0], adjacentGearCoords[1], parseInt(numberStr))
    }
  }

  return gearSymbolNumbers
}

const getGears = board => {
  const gears = []
  const partNumbers = getGearAdjacentPartNumbers(board)

  for(let y = 0; y < board.length; y++) {
    for(let x = 0; x < board[y].length; x++) {
      const square = board[y][x]

      if(isGearSymbol(square)) {
        if(partNumbers[y][x] && partNumbers[y][x].length === 2) {
          gears.push(partNumbers[y][x])
        }
      }
    }
  }

  return gears
}

then(compose(
  report,
  sum,
  map(xs => xs[0] * xs[1]),
  getGears,
), readInput(rel(import.meta.url, 'input.txt')))
