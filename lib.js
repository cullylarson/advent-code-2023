import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'
import fs from 'fs'
import {promisify} from 'util'

export const dir = (url) => {
  const filename = fileURLToPath(url)
  return dirname(filename)
}

export const rel = (url, filename) => {
  return resolve(dir(url), filename)
}

export const readFile = promisify(fs.readFile)
