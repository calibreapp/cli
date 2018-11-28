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
  mutation DeleteSnapshot($site:String!, $id: String!){
    deleteSnapshot(site: $site, iid: $id) {
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

const GET_SNAPSHOT_ARTIFACT_URLS = `
  query GetSnapshotArtifacts($site: String!, $id: Int!) {
    organisation {
      site(slug: $site) {
        pages {
          uuid
          name
        }

        testProfiles {
          uuid
          name
        }

        snapshot(id: $id) {
          iid

          tests {
            status

            har: artifactURL(name: TEST_ARTIFACT_HAR)
            lighthouse: artifactURL(name: TEST_ARTIFACT_LIGHTHOUSE)
            image: mediaURL(name: TEST_MEDIA_IMAGE)
            gif: mediaURL(name:TEST_MEDIA_GIF)
            video: mediaURL(name: TEST_MEDIA_VIDEO)

            page {
              uuid
            }

            testProfile {
              uuid
            }
          }
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

const destroy = async ({ site, id }) => {
  try {
    const response = await gql.request(DELETE_MUTATION, {
      site,
      id: Number(id)
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

const fetchArtifacts = async ({ site, id }) => {
  try {
    const response = await gql.request(GET_SNAPSHOT_ARTIFACT_URLS, {
      site,
      id: Number(id)
    })

    return response.organisation.site
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  destroy,
  list,
  fetchArtifacts
}
