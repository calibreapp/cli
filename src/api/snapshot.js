const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

const CREATE_MUTATION = `
  mutation CreateSnapshot(
    $site: String!
    $ref: String!
  ) {
    createSnapshot(site: $site, ref: $ref) {
      iid
      ref
      htmlUrl
      createdAt
    }
  }
`

const DELETE_MUTATION = `
  mutation DeleteSnapshot($site:String!, $iid: String!){
    deleteSnapshot(site: $site, iid: $iid) {
      iid
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
      ref: new String(ref)
    })
    return response.createSnapshot
  } catch (e) {
    return handleError(e)
  }
}

const destroy = async ({ site, iid }) => {
  try {
    const response = await gql.request(DELETE_MUTATION, {
      site,
      iid: String(iid)
    })
    return response.deleteSnapshot
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
  destroy,
  list
}
