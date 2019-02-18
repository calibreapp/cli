const { request } = require('./graphql')

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
  const response = await request({
    query: CREATE_MUTATION,
    site,
    ref: new String(ref)
  })
  return response.createSnapshot
}

const destroy = async ({ site, id }) => {
  const response = await request({
    query: DELETE_MUTATION,
    site,
    id: Number(id)
  })
  return response.deleteSnapshot
}

const list = async ({ site }) => {
  const response = await request({ query: LIST_QUERY, site })
  return response.organisation.site.snapshots
}

const fetchArtifacts = async ({ site, id }) => {
  const response = await request({
    query: GET_SNAPSHOT_ARTIFACT_URLS,
    site,
    id: Number(id)
  })

  return response.organisation.site
}

module.exports = {
  create,
  destroy,
  list,
  fetchArtifacts
}
