import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listPullRequestReviews from '../../fixtures/listPullRequestReviews.json'

describe('list pull request reviews', () => {
  beforeAll(async () => await setupIntegrationServer(listPullRequestReviews))
  afterAll(async () => await teardownIntegrationServer())

  test('displays help', async () => {
    const out = await runCLI({
      args: 'site pull-request-reviews --help'
    })
    expect(out).toMatchSnapshot()
  })

  test('lists pull request reviews', async () => {
    const out = await runCLI({
      args: 'site pull-request-reviews --site=test'
    })
    expect(out).toMatchSnapshot()
  })

  test('lists pull request reviews as json', async () => {
    const out = await runCLI({
      args: 'site pull-request-reviews --site=test --json'
    })
    expect(out).toMatchSnapshot()
  })
})
