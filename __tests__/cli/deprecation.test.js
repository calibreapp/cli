import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../utils'

import listPages from '../fixtures/listPages.json'

describe('deprecated commands', () => {
  beforeAll(async () => await setupIntegrationServer(listPages))
  afterAll(async () => await teardownIntegrationServer())

  test('site pages shows deprecation warning on stderr', async () => {
    const stderr = await runCLI({
      args: 'site pages --site=test',
      testForError: true
    })
    expect(stderr).toContain('[calibre:deprecated]')
    expect(stderr).toContain('synthetic pages')
  })

  test('site pages still returns valid output on stdout', async () => {
    const stdout = await runCLI({
      args: 'site pages --site=test'
    })
    expect(stdout).toBeTruthy()
  })
})
