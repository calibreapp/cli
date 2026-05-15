import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import cruxUrls from '../../fixtures/cruxUrls.json'

describe('crux urls', () => {
  beforeAll(async () => await setupIntegrationServer(cruxUrls))
  afterAll(async () => await teardownIntegrationServer())

  test('lists crux urls', async () => {
    const out = await runCLI({
      args: 'crux urls --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
