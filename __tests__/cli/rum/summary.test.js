import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import rumSummary from '../../fixtures/rumSummary.json'

describe('rum summary', () => {
  beforeAll(async () => await setupIntegrationServer(rumSummary))
  afterAll(async () => await teardownIntegrationServer())

  test('displays rum summary', async () => {
    const out = await runCLI({
      args: 'rum summary --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
