import { request } from './graphql.js'

const CREATE_MUTATION = `
  mutation StartPullRequestReview($site: String!, $attributes: PullRequestReviewInput!){
    startPullRequestReview(site: $site, attributes: $attributes) {
      title
      status
      branch
      markdownReport
    }
  }
`

const LIST_QUERY = `
  query ListPullRequestReviews(
    $site: String!
  ) {
    organisation {
      site(slug: $site) {
        pullRequestReviews {
          title
          status
          branch
          sha
          createdAt
        }
      }
    }
  }
`

const GET_PR_REVIEW_BY_BRANCH = `
  query GetPullRequestReviewByBranch($site: String!, $branch: String) {
    organisation {
      site(slug: $site) {
        pullRequestReviews(branch: $branch) {
          title
          status
          branch
          markdownReport
          metricBudgetStatus
        }
      }
    }
  }
`

const create = async ({ site, title, url, branch, sha, config }) => {
  const response = await request({
    query: CREATE_MUTATION,
    site,
    attributes: {
      title,
      url,
      branch,
      sha,
      config
    }
  })

  return response.startPullRequestReview
}

const list = async ({ site }) => {
  const response = await request({ query: LIST_QUERY, site })

  return response.organisation.site.pullRequestReviews
}

const getPRReviewByBranch = async (site, branch) => {
  const response = await request({
    query: GET_PR_REVIEW_BY_BRANCH,
    site,
    branch
  })

  return response.organisation.site.pullRequestReviews
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitForReviewCompletion = async (site, branch) => {
  while (true) {
    await delay(5000)
    const [review] = await getPRReviewByBranch(site, branch)

    if (['completed', 'errored', 'timeout'].includes(review?.status)) {
      return review
    }
  }
}

export { create, list, waitForReviewCompletion, getPRReviewByBranch }
