const gql = require('../utils/api-client')

const CREATE_MUTATION = `
  mutation CreateSnapshot(
    $site: String!
    $ref: String
  ) {
    createSnapshot(site: $site, ref: $ref) {
      iid
      ref
      htmlUrl
      createdAt
    }
  }
`

const LIST_QUERY = `
  query ListSnapshots(
    $site: String!
  ) {
    organisation {
      site(slug: $site) {
        snapshots {
          iid
          htmlUrl
          ref
          client
          createdAt
          status
        }
      }
    }
  }
`

const create = async ({ site, ref }) => {
  try {
    const response = await gql.request(CREATE_MUTATION, { site, ref })
    return response.createSnapshot
  } catch (e) {
    throw e.response.errors
  }
}

const list = async ({ site }) => {
  try {
    const response = await gql.request(LIST_QUERY, { site })
    return response.organisation.site.snapshots
  } catch (e) {
    throw e.response.errors
  }
}

module.exports = {
  create,
  list
}
