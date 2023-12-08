import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, rankHand, compareEqualHands} from './lib.js'
import {rel, sort, sum} from '../lib.js'

const normalCards = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
]

const cardRankings = {
  A: 12,
  K: 11,
  Q: 10,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
  J: -1,
}

const rankHandWithWilds = hand => {
  if(!hand.includes('J')) {
    return rankHand(hand)
  }

  let best = 0

  for(let i = 0; i < hand.length; i++) {
    const card = hand[i]

    if(card === 'J') {
      for(let j = 0; j < normalCards.length; j++) {
        const normalCard = normalCards[j]
        const handCopy = [...hand]
        handCopy[i] = normalCard

        const score = rankHandWithWilds(handCopy)

        if(score > best) {
          best = score
        }
      }
    }
  }

  return best
}

const sortHand = (deal) => ({
  ...deal,
  originalHand: deal.hand,
  hand: sort((a, b) => cardRankings[b] - cardRankings[a], deal.hand),
})

const sortDeals = sort((a, b) => {
  if(a.score === b.score) {
    return compareEqualHands(cardRankings, a.originalHand, b.originalHand)
  }
  else {
    return a.score - b.score
  }
})

const augScore = deal => ({
  ...deal,
  score: rankHandWithWilds(deal.hand),
})

const scoreDeals = (deal, i) => {
  return deal.bid * (i + 1)
}

then(compose(
  report,
  sum,
  map(scoreDeals),
  sortDeals,
  map(augScore),
  map(sortHand),
), readInput(rel(import.meta.url, 'input.txt')))
