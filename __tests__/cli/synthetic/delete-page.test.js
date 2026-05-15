import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import deletePage from '../../fixtures/deletePage.json'
describe('synthetic delete-page', () => {
  beforeAll(async () => await setupIntegrationServer(deletePage))
  afterAll(async () => await teardownIntegrationServer())
  test('deletes page', async () => {
    expect(await runCLI({args: 'synthetic delete-page --uuid=page-uuid-123 --site=test --confirm'})).toMatchSnapshot()
  })
})
