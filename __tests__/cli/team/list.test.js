import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listTeams from '../../fixtures/listTeams.json'

describe('team list', () => {
  beforeAll(() => setupIntegrationServer(listTeams))
  afterAll(() => teardownIntegrationServer())

  test('lists all teams', async () => {
    const out = await runCLI({
      args: 'team list'
    })
    expect(out).toMatchSnapshot()
  })
})
