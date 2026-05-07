import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listPages from '../../fixtures/listPages.json'

describe('synthetic pages', () => {
  beforeAll(async () => await setupIntegrationServer(listPages))
  afterAll(async () => await teardownIntegrationServer())

  test('lists all snapshots', async () => {
    const out = await runCLI({
      args: 'synthetic pages --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
