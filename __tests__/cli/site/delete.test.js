import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import deleteSite from '../../fixtures/deleteSite.json'

describe('site delete', () => {
  beforeAll(async () => await setupIntegrationServer(deleteSite))
  afterAll(async () => await teardownIntegrationServer())

  test('deletes site', async () => {
    const out = await runCLI({
      args: 'site delete test-site'
    })
    expect(out).toMatchSnapshot()
  })
})
