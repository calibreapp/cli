const gql = require('../utils/api-client')

const SNAPSHOT_METRICS_QUERY = `
  query GetSnapshotMetrics(
    $site: String!,
    $snapshotId: Int!
  ) {
    organisation {
      site(slug: $site) {
        snapshot(id: $snapshotId) {
          tests {
            page {
              name
              url
            }

            testProfile {
              id
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
          id
          name
          device {
            title
          }
          bandwidth {
            title
          }
          isMobile
          jsIsDisabled
          hasDeviceEmulation
          hasBandwidthEmulation
        }
      }
    }
  }
`

const PULSE_METRICS_QUERY = `
  query GetPulsePageData(
    $site: String!
    $page: String
    $durationInDays: Int
  ) {
    organisation {
      site(slug: $site) {
        hasCompletedSnapshots

        page(slug: $page) {
          name
          url

          timeseries(duration_in_days: $durationInDays) {
            snapshots {
              id
              sequenceId: iid
              createdAt
            }

            series {
              metric {
                name
                label
                formatter
                docsPath
              }

              sets {
                profile {
                  id
                  name
                }

                values {
                  snapshot
                  value
                }
              }
            }
          }
        }

        testProfiles {
          id
          name
          device {
            title
          }
          bandwidth {
            title
          }
          isMobile
          jsIsDisabled
          hasDeviceEmulation
          hasBandwidthEmulation
        }
      }
    }
  }
`

const snapshot = async ({ site, snapshotId }) => {
  try {
    const response = await gql.request(SNAPSHOT_METRICS_QUERY, {
      site,
      snapshotId
    })
    return response.organisation.site
  } catch (e) {
    if (e.response && e.response.error) throw e.response
    if (e.response && e.response.errors) throw e.response.errors
    else throw e
  }
}

const pulse = async ({ site, page, durationInDays }) => {
  try {
    const response = await gql.request(PULSE_METRICS_QUERY, {
      site,
      page,
      durationInDays
    })
    return response.organisation.site
  } catch (e) {
    if (e.response && e.response.error) throw e.response
    if (e.response && e.response.errors) throw e.response.errors
    else throw e
  }
}

module.exports = {
  snapshot,
  pulse
}
