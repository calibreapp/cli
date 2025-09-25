import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listTeams from '../../fixtures/listTeams.json'

describe('team list', () => {
  beforeAll(async () => await setupIntegrationServer(listTeams))
  afterAll(async () => await teardownIntegrationServer())

  test('lists all teams', async () => {
    const out = await runCLI({
      args: 'team list'
    })
    expect(out).toMatchSnapshot()
  })
})
