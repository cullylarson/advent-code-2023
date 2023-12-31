import {spawn} from 'child_process'
import cases from 'jest-in-case'
import {jest} from '@jest/globals'

jest.setTimeout(15000)

const parts = {
  'day 1, part 1':
  {
    part: 'day-01/part-1.js',
    answer: '54081',
  },
  'day 1, part 2': {
    part: 'day-01/part-2.js',
    answer: '54649',
  },
  'day 2, part 1':
  {
    part: 'day-02/part-1.js',
    answer: '2879',
  },
  'day 2, part 2':
  {
    part: 'day-02/part-2.js',
    answer: '65122',
  },
  'day 3, part 1':
  {
    part: 'day-03/part-1.js',
    answer: '527369',
  },
  'day 3, part 2':
  {
    part: 'day-03/part-2.js',
    answer: '73074886',
  },
  'day 4, part 1':
  {
    part: 'day-04/part-1.js',
    answer: '23941',
  },
  'day 4, part 2':
  {
    part: 'day-04/part-2.js',
    answer: '5571760',
  },
  'day 5, part 1':
  {
    part: 'day-05/part-1.js',
    answer: '323142486',
  },
  'day 6, part 1':
  {
    part: 'day-06/part-1.js',
    answer: '800280',
  },
  'day 6, part 2':
  {
    part: 'day-06/part-2.js',
    answer: '45128024',
  },
  'day 7, part 1':
  {
    part: 'day-07/part-1.js',
    answer: '247823654',
  },
  'day 7, part 2':
  {
    part: 'day-07/part-2.js',
    answer: '245461700',
  },
  'day 8, part 1':
  {
    part: 'day-08/part-1.js',
    answer: '21389',
  },
  'day 9, part 1':
  {
    part: 'day-09/part-1.js',
    answer: '1955513104',
  },
  'day 9, part 2':
  {
    part: 'day-09/part-2.js',
    answer: '1131',
  },
}

const run = async (scriptPath) => {
  return new Promise((resolve, reject) => {
    let result = ''

    const prc = spawn('node', [scriptPath], {
      env: process.env,
    })

    prc.stdout.setEncoding('utf8')

    prc.stdout.on('data', data => {
      result += data.toString()
    })

    prc.on('error', err => {
      reject(err)
    })

    prc.on('exit', () => {
      resolve(result)
    })
  })
}

cases('days', async ({part, answer}) => {
  const result = (await run(part)).trim()

  expect(result).toBe(answer)
}, parts)
