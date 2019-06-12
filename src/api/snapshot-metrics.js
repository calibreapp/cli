const { request } = require('./graphql')

const SNAPSHOT_METRICS_QUERY = `
  query GetSnapshotMetrics(
    $site: String!,
    $snapshotId: Int!
  ) {
    organisation {
      site(slug: $site) {
        snapshot(id: $snapshotId) {
          iid

          tests {
            page {
              name
              url
            }

            testProfile {
              uuid
            }

            measurements {
              name
              label
              value
            }
          }
          sequenceId: iid
          htmlUrl
          status
          createdAt
        }

        testProfiles {
          uuid
          name
          device {
            title
          }
          bandwidth {
            title
          }
          isMobile
          jsIsDisabled
          adBlockerIsEnabled
          hasDeviceEmulation
          hasBandwidthEmulation
        }
      }
    }
  }
`
const snapshot = async ({ site, snapshotId }) => {
  const response = await request({
    query: SNAPSHOT_METRICS_QUERY,
    site,
    snapshotId
  })
  return response.organisation.site
}

module.exports = {
  snapshot
}
