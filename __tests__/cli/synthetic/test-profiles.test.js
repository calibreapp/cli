import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import listTestProfiles from '../../fixtures/listTestProfiles.json'
describe('synthetic test-profiles', () => {
  beforeAll(async () => await setupIntegrationServer(listTestProfiles))
  afterAll(async () => await teardownIntegrationServer())
  test('lists test profiles', async () => {
    expect(await runCLI({args: 'synthetic test-profiles --site=test'})).toMatchSnapshot()
  })
})
