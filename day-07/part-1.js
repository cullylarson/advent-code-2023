import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, rankHand, compareEqualHands} from './lib.js'
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

const sortHand = (deal) => ({
  ...deal,
  originalHand: deal.hand,
  hand: sort((a, b) => cardRankings[b] - cardRankings[a], deal.hand),
})

const sortDeals = sort((a, b) => {
  const aRank = rankHand(a.hand)
  const bRank = rankHand(b.hand)

  if(aRank === bRank) {
    return compareEqualHands(cardRankings, a.originalHand, b.originalHand)
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
