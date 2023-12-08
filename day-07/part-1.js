import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sort, sum} from '../lib.js'

const cardRankings = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
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

const countHand = hand => {
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

const rankHand = hand => {
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

const compareEqualHands = (a, b) => {
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
}

const sortHand = (deal) => ({
  ...deal,
  originalHand: deal.hand,
  hand: sort((a, b) => cardRankings[b] - cardRankings[a], deal.hand),
})

const sortDeals = sort((a, b) => {
  const aRank = rankHand(a.hand)
  const bRank = rankHand(b.hand)

  if(aRank === bRank) {
    return compareEqualHands(a.originalHand, b.originalHand)
  }
  else {
    return aRank - bRank
  }
})

const scoreDeals = (deal, i) => {
  return deal.bid * (i + 1)
}

then(compose(
  report,
  sum,
  map(scoreDeals),
  sortDeals,
  map(sortHand),
), readInput(rel(import.meta.url, 'input.txt')))
