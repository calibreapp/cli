import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import updatePage from '../../fixtures/updatePage.json'
describe('synthetic update-page', () => {
  beforeAll(async () => await setupIntegrationServer(updatePage))
  afterAll(async () => await teardownIntegrationServer())
  test('updates page', async () => {
    expect(await runCLI({args: 'synthetic update-page --uuid=page-uuid-123 --name="Updated Page" --site=test'})).toMatchSnapshot()
  })
})
