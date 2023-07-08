import { request } from './graphql.js'

const CREATE_MUTATION = `
  mutation CreatePullRequestReview($site: String!, $attributes: PullRequestReviewInput!){
    createPullRequestReview(site: $site, attributes: $attributes) {
      uuid
      status
    }
  }
`

const LIST_QUERY = `
  query ListPages(
    $site: String!
    $count: Int!
    $cursor: String
  ) {
    organisation {
      site(slug: $site) {
        pullRequestReviews {
          edges {
            node {
              uuid
              name
              url
              status
            }
          }
        }
      }
    }
  }
`

const GET_PR_REVIEW_BY_UUID = `
  query GetPullRequestReviewByUuid($site: String!, $uuid: String!) {
    organisation {
      site(slug: $slug) {
        pullRequestReviews(uuid: $uuid) {
          uuid
          status
        }
      }
    }
  }
`

const create = async ({ site, name, url, sha }) => {
  const response = await request({
    query: CREATE_MUTATION,
    site,
    attributes: {
      name,
      url,
      sha
    }
  })

  return response.createPullRequestReview
}

const list = async ({ site }) => {
  const response = await request({ query: LIST_QUERY, site })
  return {
    pullRequestReviews: response.organisation.site.pullRequestReviews.edges.map(
      edge => edge.node
    )
  }
}

const getPRReviewByUuid = async (site, uuid) => {
  const response = await request({
    query: GET_PR_REVIEW_BY_UUID,
    site,
    uuid
  })

  return response.pullRequestReview
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitForReviewCompletion = async (site, uuid) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await delay(5000)
    const review = await getPRReviewByUuid(site, uuid)
    if (['completed', 'errored', 'timeout'].includes(review.status))
      return review
  }
}

export { create, list, waitForReviewCompletion }
