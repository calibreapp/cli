import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import deleteTestProfile from '../../fixtures/deleteTestProfile.json'
describe('synthetic delete-test-profile', () => {
  beforeAll(async () => await setupIntegrationServer(deleteTestProfile))
  afterAll(async () => await teardownIntegrationServer())
  test('deletes test profile', async () => {
    expect(await runCLI({args: 'synthetic delete-test-profile --uuid=profile-uuid-123 --site=test --confirm'})).toMatchSnapshot()
  })
})
