const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

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
    $metrics: [MetricTag!]
  ) {
    organisation {
      site(slug: $site) {
        hasCompletedSnapshots

        page(uuid: $page) {
          name
          uuid
          url

          timeseries(duration_in_days: $durationInDays, metrics: $metrics) {
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
    return handleError(e)
  }
}

const pulse = async ({ site, page, durationInDays, metrics }) => {
  try {
    const response = await gql.request(PULSE_METRICS_QUERY, {
      site,
      page,
      durationInDays,
      metrics
    })
    return response.organisation.site
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  snapshot,
  pulse
}
