import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const getNumMatching = ({winning, mine}) => {
  return compose(
    sum,
    map(x => winning.includes(x) ? 1 : 0),
  )(mine)
}

const augCardNumber = (cards) => cards.map((x, idx) => ({
  cardId: idx + 1,
  winning: x[0],
  mine: x[1],
}), {})

const getCardScore = (cardId, scoreTree) => {
  return 1 + sum(scoreTree[cardId - 1].map(x => getCardScore(x, scoreTree)))
}

const getScoreTree = cards => {
  return cards.map(card => {
    const extraCards = []

    const numMatching = getNumMatching(card)

    for(let i = card.cardId + 1; i <= card.cardId + numMatching; i++) {
      extraCards.push(i)
    }

    return extraCards
  })
}

const scoreCards = initialCards => {
  const scoreTree = getScoreTree(initialCards)

  return sum(initialCards.map(x => getCardScore(x.cardId, scoreTree)))
}

then(compose(
  report,
  scoreCards,
  augCardNumber,
), readInput(rel(import.meta.url, 'input.txt')))
