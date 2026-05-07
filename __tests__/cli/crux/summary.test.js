import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import cruxSummary from '../../fixtures/cruxSummary.json'

describe('crux summary', () => {
  beforeAll(async () => await setupIntegrationServer(cruxSummary))
  afterAll(async () => await teardownIntegrationServer())

  test('displays crux summary', async () => {
    const out = await runCLI({
      args: 'crux summary --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
