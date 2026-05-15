import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import createPage from '../../fixtures/createPage.json'
describe('synthetic create-page', () => {
  beforeAll(async () => await setupIntegrationServer(createPage))
  afterAll(async () => await teardownIntegrationServer())
  test('creates page', async () => {
    expect(await runCLI({args: 'synthetic create-page "New Page" --url=https://example.com/new --site=test'})).toMatchSnapshot()
  })
})
