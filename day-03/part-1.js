import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const isSymbol = (value) => {
  return value !== '.' && isNaN(Number(value))
}

const isSymbolSquare = (board, y, x) => {
  if(y < 0) return false
  if(x < 0) return false
  if(y >= board.length) return false
  if(x >= board[y].length) return false

  return isSymbol(board[y][x])
}

const isSymbolAdjacent = (board, y, x) => {
  return isSymbolSquare(board, y - 1, x - 1) // upper left
    || isSymbolSquare(board, y - 1, x) // above
    || isSymbolSquare(board, y - 1, x + 1) // upper right
    || isSymbolSquare(board, y, x + 1) // right
    || isSymbolSquare(board, y + 1, x + 1) // lower right
    || isSymbolSquare(board, y + 1, x) // below
    || isSymbolSquare(board, y + 1, x - 1) // lower left
    || isSymbolSquare(board, y, x - 1) // left
}

const getPartNumbersBoard = (board) => {
  const partNumbers = []

  for(let y = 0; y < board.length; y++) {
    let numberStr = ''
    let isPartNumber = false

    for(let x = 0; x < board[y].length; x++) {
      const square = board[y][x]

      // end of number
      if(square === '.' || isSymbol(square)) {
        if(numberStr !== '' && isPartNumber) {
          partNumbers.push(parseInt(numberStr))
        }

        numberStr = ''
        isPartNumber = false
      }
      else {
        numberStr += square

        if(isSymbolAdjacent(board, y, x)) {
          isPartNumber = true
        }
      }
    }

    // end of line
    if(numberStr !== '' && isPartNumber) {
      partNumbers.push(parseInt(numberStr))
    }
  }

  return partNumbers
}

then(compose(
  report,
  sum,
  getPartNumbersBoard,
), readInput(rel(import.meta.url, 'input.txt')))
