const { request } = require('./graphql')

const CREATE_MUTATION = `
  mutation CreateDeploy($organisation: String, $site: String!, $attributes: DeployInput!){
    createDeploy(organisation: $organisation, site: $site, attributes: $attributes) {
      uuid
      revision
      repository
      url
      username
      createdAt
    }
  }
`

const DELETE_MUTATION = `
  mutation DeleteDeploy($organisation: String, $site:String!, $uuid: String!){
    deleteDeploy(organisation: $organisation, site: $site, uuid: $uuid) {
      uuid
    }
  }
`

const LIST_QUERY = `
  query ListDeploys(
    $site: String!
    $count: Int!
    $cursor: String
  ) {
    organisation {
      site(slug: $site) {
        deploys(first: $count, after: $cursor) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
            startCursor
          }

          edges {
            node {
              uuid
              revision
              repository
              url
              username
              createdAt
            }
          }
        }
      }
    }
  }
`

const create = async ({ site, revision, repository, username, createdAt }) => {
  const response = await request({
    query: CREATE_MUTATION,
    site,
    attributes: {
      revision,
      repository,
      username,
      createdAt
    }
  })
  return response.createDeploy
}

const destroy = async ({ site, uuid }) => {
  const response = await request({
    query: DELETE_MUTATION,
    site,
    uuid
  })
  return response.deleteDeploy
}

const list = async ({ site, count = 25, cursor }) => {
  const response = await request({
    query: LIST_QUERY,
    site,
    count,
    cursor
  })

  return {
    deploys: response.organisation.site.deploys.edges.map(edge => edge.node),
    pageInfo: response.organisation.site.deploys.pageInfo
  }
}

module.exports = {
  create,
  destroy,
  list
}
