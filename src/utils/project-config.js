import { existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'

const CONFIG_FILENAME = 'calibre.json'

const findConfigFile = (startDir = process.cwd()) => {
  let dir = resolve(startDir)

  while (true) {
    const candidate = resolve(dir, CONFIG_FILENAME)
    if (existsSync(candidate)) return candidate

    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

const loadProjectConfig = (startDir = process.cwd()) => {
  const configPath = findConfigFile(startDir)
  if (!configPath) return {}

  const content = readFileSync(configPath, 'utf8')
  return JSON.parse(content)
}

export { findConfigFile, loadProjectConfig, CONFIG_FILENAME }
