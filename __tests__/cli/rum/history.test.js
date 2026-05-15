import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import rumHistory from '../../fixtures/rumHistory.json'

describe('rum history', () => {
  beforeAll(async () => await setupIntegrationServer(rumHistory))
  afterAll(async () => await teardownIntegrationServer())

  test('displays rum history', async () => {
    const out = await runCLI({
      args: 'rum history --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
