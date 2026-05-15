import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listSites from '../../fixtures/listSites.json'

describe('site list', () => {
  beforeAll(async () => await setupIntegrationServer(listSites))
  afterAll(async () => await teardownIntegrationServer())

  test('lists all sites', async () => {
    const out = await runCLI({
      args: 'site list'
    })
    expect(out).toMatchSnapshot()
  })
})
