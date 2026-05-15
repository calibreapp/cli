import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listDeploys from '../../fixtures/listDeploys.json'

describe('deploy list', () => {
  beforeAll(async () => await setupIntegrationServer(listDeploys))
  afterAll(async () => await teardownIntegrationServer())

  test('lists all deploys', async () => {
    const out = await runCLI({
      args: 'deploy list --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
