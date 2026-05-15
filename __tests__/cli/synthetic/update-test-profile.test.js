import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import updateTestProfile from '../../fixtures/updateTestProfile.json'
describe('synthetic update-test-profile', () => {
  beforeAll(async () => await setupIntegrationServer(updateTestProfile))
  afterAll(async () => await teardownIntegrationServer())
  test('updates test profile', async () => {
    expect(await runCLI({args: 'synthetic update-test-profile --uuid=profile-uuid-123 --name="Updated Profile" --site=test'})).toMatchSnapshot()
  })
})
