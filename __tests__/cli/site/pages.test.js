import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listPages from '../../fixtures/listPages.json'

describe('site snapshots', () => {
  beforeAll(() => setupIntegrationServer(listPages))
  afterAll(() => teardownIntegrationServer())

  test('lists all snapshots', async () => {
    const out = await runCLI({
      args: 'site pages --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
