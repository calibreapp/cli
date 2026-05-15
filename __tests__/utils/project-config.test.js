import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

import {
  findConfigFile,
  loadProjectConfig,
  CONFIG_FILENAME
} from '../../src/utils/project-config'

describe('project-config', () => {
  let tempDir

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'calibre-test-'))
  })

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true })
  })

  describe('findConfigFile', () => {
    it('finds calibre.json in the current directory', () => {
      const configPath = join(tempDir, CONFIG_FILENAME)
      writeFileSync(configPath, JSON.stringify({ site: 'my-site' }))

      expect(findConfigFile(tempDir)).toBe(configPath)
    })

    it('finds calibre.json in a parent directory', () => {
      const configPath = join(tempDir, CONFIG_FILENAME)
      writeFileSync(configPath, JSON.stringify({ site: 'my-site' }))

      const nested = join(tempDir, 'a', 'b', 'c')
      mkdirSync(nested, { recursive: true })

      expect(findConfigFile(nested)).toBe(configPath)
    })

    it('returns null when no config exists', () => {
      expect(findConfigFile(tempDir)).toBeNull()
    })
  })

  describe('loadProjectConfig', () => {
    it('loads and parses config correctly', () => {
      const config = { site: 'my-site' }
      writeFileSync(
        join(tempDir, CONFIG_FILENAME),
        JSON.stringify(config)
      )

      expect(loadProjectConfig(tempDir)).toEqual(config)
    })

    it('returns empty object when no config exists', () => {
      expect(loadProjectConfig(tempDir)).toEqual({})
    })
  })
})
