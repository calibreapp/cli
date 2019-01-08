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
          hasDeviceEmulation
          hasBandwidthEmulation
        }
      }
    }
  }
`

const TIMESERIES_FRAGMENT = `
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
      page {
        uuid
        name
        url
      }

      profile {
        uuid
        name
      }

      values {
        snapshot
        value
      }
    }
  }
}`

const PULSE_METRICS_QUERY = `
  query GetPulseData(
    $site: String!
    $durationInDays: Int
    $metrics: [MetricTag!]
  ) {
    organisation {
      site(slug: $site) {
        hasCompletedSnapshots

        ${TIMESERIES_FRAGMENT}

        pages {
          name
          uuid
          url
        }

        testProfiles {
          name
          uuid
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

const PULSE_PAGE_METRICS_QUERY = `
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
          ${TIMESERIES_FRAGMENT}
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
  let query,
    attributes = {}

  if (page) {
    query = PULSE_PAGE_METRICS_QUERY
    attributes = {
      site,
      page,
      durationInDays,
      metrics
    }
  } else {
    query = PULSE_METRICS_QUERY
    attributes = { site, durationInDays, metrics }
  }

  try {
    const response = await gql.request(query, attributes)
    return response.organisation.site
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  snapshot,
  pulse
}
