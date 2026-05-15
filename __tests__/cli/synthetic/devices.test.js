import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import listDevices from '../../fixtures/listDevices.json'
describe('synthetic devices', () => {
  beforeAll(async () => await setupIntegrationServer(listDevices))
  afterAll(async () => await teardownIntegrationServer())
  test('lists devices', async () => {
    expect(await runCLI({args: 'synthetic devices --site=test'})).toMatchSnapshot()
  })
})
