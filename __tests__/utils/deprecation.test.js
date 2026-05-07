import { deprecatedHandler } from '../../src/utils/deprecation.js'

describe('deprecatedHandler', () => {
  let stderrOutput
  const originalWrite = process.stderr.write

  beforeEach(() => {
    stderrOutput = ''
    process.stderr.write = chunk => {
      stderrOutput += chunk
    }
    delete process.env.CALIBRE_SUPPRESS_DEPRECATIONS
  })

  afterEach(() => {
    process.stderr.write = originalWrite
    delete process.env.CALIBRE_SUPPRESS_DEPRECATIONS
  })

  test('prints deprecation warning to stderr', async () => {
    let calledWith = null
    const inner = args => {
      calledWith = args
    }
    const handler = deprecatedHandler('site pages', 'synthetic pages', inner)
    await handler({ site: 'test' })
    expect(stderrOutput).toContain('[calibre:deprecated]')
    expect(stderrOutput).toContain('site pages')
    expect(stderrOutput).toContain('synthetic pages')
    expect(calledWith).toEqual({ site: 'test' })
  })

  test('suppresses warning when CALIBRE_SUPPRESS_DEPRECATIONS is set', async () => {
    process.env.CALIBRE_SUPPRESS_DEPRECATIONS = '1'
    let called = false
    const inner = () => {
      called = true
    }
    const handler = deprecatedHandler('site pages', 'synthetic pages', inner)
    await handler({ site: 'test' })
    expect(stderrOutput).toBe('')
    expect(called).toBe(true)
  })
})
