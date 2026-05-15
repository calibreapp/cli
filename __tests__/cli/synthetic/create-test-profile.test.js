import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import createTestProfile from '../../fixtures/createTestProfile.json'
describe('synthetic create-test-profile', () => {
  beforeAll(async () => await setupIntegrationServer(createTestProfile))
  afterAll(async () => await teardownIntegrationServer())
  test('creates test profile', async () => {
    expect(await runCLI({args: 'synthetic create-test-profile "New Profile" --site=test'})).toMatchSnapshot()
  })
})
