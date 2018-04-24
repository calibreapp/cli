const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

const CREATE_MUTATION = `
  mutation CreateSnapshot(
    $site: String!
    $attributes: SnapshotInput
  ) {
    createSnapshot(site: $site, attributes: $attributes) {
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
    const response = await gql.request(CREATE_MUTATION, {
      site,
      attributes: { ref: new String(ref) }
    })
    return response.createSnapshot
  } catch (e) {
    return handleError(e)
  }
}

const list = async ({ site }) => {
  try {
    const response = await gql.request(LIST_QUERY, { site })
    return response.organisation.site.snapshots
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  list
}
