import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import listLocations from '../../fixtures/listLocations.json'
describe('synthetic locations', () => {
  beforeAll(async () => await setupIntegrationServer(listLocations))
  afterAll(async () => await teardownIntegrationServer())
  test('lists locations', async () => {
    expect(await runCLI({args: 'synthetic locations --site=test'})).toMatchSnapshot()
  })
})
