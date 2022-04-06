import { request } from './graphql'

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
    $count: Int!
    $cursor: String
  ) {
    organisation {
      site(slug: $site) {
        snapshotsList(first: $count, after: $cursor) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
            startCursor
          }

          edges {
            node {
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
    }
  }
`

const GET_SNAPSHOT_ARTIFACT_URLS = `
  query GetSnapshotArtifacts($site: String!, $id: Int!) {
    organisation {
      site(slug: $site) {
        snapshot(id: $id) {
          iid

          tests {
            status

            har: artifactURL(name: TEST_ARTIFACT_HAR)
            lighthouse: artifactURL(name: TEST_ARTIFACT_LIGHTHOUSE)
            image: mediaURL(name: TEST_MEDIA_IMAGE)
            video: mediaURL(name: TEST_MEDIA_VIDEO)

            page {
              uuid
              name
            }

            testProfile {
              uuid
              name
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
    ref: ref ? new String(ref) : null
  })
  return response.createSnapshot
}

const destroy = async ({ site, id }) => {
  const response = await request({
    query: DELETE_MUTATION,
    site,
    id: String(id)
  })
  return response.deleteSnapshot
}

const list = async ({ site, count, cursor }) => {
  const response = await request({ query: LIST_QUERY, site, count, cursor })
  return {
    snapshots: response.organisation.site.snapshotsList.edges.map(
      edge => edge.node
    ),
    pageInfo: response.organisation.site.snapshotsList.pageInfo
  }
}

const fetchArtifacts = async ({ site, id }) => {
  const response = await request({
    query: GET_SNAPSHOT_ARTIFACT_URLS,
    site,
    id: Number(id)
  })

  return response.organisation.site
}

export { create, destroy, list, fetchArtifacts }
