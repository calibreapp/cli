import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import deleteSnapshot from '../../fixtures/deleteSnapshot.json'

describe('synthetic delete-snapshot', () => {
  beforeAll(async () => await setupIntegrationServer(deleteSnapshot))
  afterAll(async () => await teardownIntegrationServer())

  test('deletes snapshot', async () => {
    const out = await runCLI({
      args: 'synthetic delete-snapshot --site=test --id=1',
      testForError: true
    })
    expect(out).toMatchSnapshot()
  })
})
