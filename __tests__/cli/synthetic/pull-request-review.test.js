import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import getPullRequestReviewByBranch from '../../fixtures/getPullRequestReviewByBranch.json'

describe('synthetic pull-request-review', () => {
  beforeAll(async () => await setupIntegrationServer(getPullRequestReviewByBranch))
  afterAll(async () => await teardownIntegrationServer())

  test('displays help', async () => {
    const out = await runCLI({
      args: 'synthetic pull-request-review --help'
    })
    expect(out).toMatchSnapshot()
  })

  test('displays review', async () => {
    const out = await runCLI({
      args: 'synthetic pull-request-review "author/my-pr" --site=test'
    })
    expect(out).toMatchSnapshot()
  })

  test('displays review json', async () => {
    const out = await runCLI({
      args: 'synthetic pull-request-review "author/my-pr" --site=test --json'
    })
    expect(out).toMatchSnapshot()
  })

  test('displays review markdown', async () => {
    const out = await runCLI({
      args: 'synthetic pull-request-review "author/my-pr" --site=test --markdown'
    })
    expect(out).toMatchSnapshot()
  })
})
