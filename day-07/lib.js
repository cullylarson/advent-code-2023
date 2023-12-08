import {compose, trim, split, map, curry} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const lineToDeal = ([handStr, bid]) => {
  const hand = handStr.split('')

  return {
    hand,
    bid: Number(bid),
  }
}

const handRankings = {
  '5OC': 6,
  '4OC': 5,
  FH: 4,
  '3OC': 3,
  '2P': 2,
  '1P': 1,
  HC: 0,
}

export const countHand = hand => {
  const counts = []
  const found = new Set()

  for(let i = 0; i < hand.length; i++) {
    const card = hand[i]

    if(!found.has(card)) {
      counts.push(hand.filter(x => x === card).length)
      found.add(card)
    }
  }

  return counts
}

export const rankHand = hand => {
  const counts = countHand(hand)

  if(counts.includes(5)) {
    return handRankings['5OC']
  }
  else if(counts.includes(4)) {
    return handRankings['4OC']
  }
  else if(counts.includes(3)) {
    if(counts.includes(2)) {
      return handRankings.FH
    }
    else {
      return handRankings['3OC']
    }
  }
  else if(counts.includes(2)) {
    if(counts.filter(x => x === 2).length === 2) {
      return handRankings['2P']
    }
    else {
      return handRankings['1P']
    }
  }
  else {
    return handRankings.HC
  }
}

export const compareEqualHands = curry((cardRankings, a, b) => {
  if(a.length !== b.length) {
    throw Error('Hands are not equal length.')
  }

  for(let i = 0; i < a.length; i++) {
    const aCard = a[i]
    const bCard = b[i]

    if(aCard !== bCard) {
      return cardRankings[aCard] - cardRankings[bCard]
    }
  }

  return 0
})

export const readInput = filename => then(compose(
  map(lineToDeal),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
