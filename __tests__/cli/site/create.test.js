import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import createSite from '../../fixtures/createSite.json'

describe('site create', () => {
  beforeAll(async () => await setupIntegrationServer(createSite))
  afterAll(async () => await teardownIntegrationServer())

  test('creates site', async () => {
    const out = await runCLI({
      args: 'site create "New Site" --url=https://new-site.com --location=Sydney'
    })
    expect(out).toMatchSnapshot()
  })
})
