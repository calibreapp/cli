import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import downloadArtifacts from '../../fixtures/downloadArtifacts.json'
describe('synthetic download-artifacts', () => {
  beforeAll(async () => await setupIntegrationServer(downloadArtifacts))
  afterAll(async () => await teardownIntegrationServer())
  test('downloads artifacts', async () => {
    expect(await runCLI({args: 'synthetic download-artifacts --id=14 --site=test'})).toMatchSnapshot()
  })
})
