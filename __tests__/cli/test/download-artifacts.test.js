import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import testDownloadArtifacts from '../../fixtures/testDownloadArtifacts.json'
describe('test download-artifacts', () => {
  beforeAll(async () => await setupIntegrationServer(testDownloadArtifacts))
  afterAll(async () => await teardownIntegrationServer())
  test('downloads test artifacts', async () => {
    expect(await runCLI({args: 'test download-artifacts test-1'})).toMatchSnapshot()
  })
})
