import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import createSnapshot from '../../fixtures/createSnapshot.json'
describe('synthetic create-snapshot', () => {
  beforeAll(async () => await setupIntegrationServer(createSnapshot))
  afterAll(async () => await teardownIntegrationServer())
  test('creates snapshot', async () => {
    expect(await runCLI({args: 'synthetic create-snapshot page-uuid-123 --site=test'})).toMatchSnapshot()
  })
})
