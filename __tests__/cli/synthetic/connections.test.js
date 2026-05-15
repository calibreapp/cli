import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import listConnections from '../../fixtures/listConnections.json'
describe('synthetic connections', () => {
  beforeAll(async () => await setupIntegrationServer(listConnections))
  afterAll(async () => await teardownIntegrationServer())
  test('lists connections', async () => {
    expect(await runCLI({args: 'synthetic connections --site=test'})).toMatchSnapshot()
  })
})
