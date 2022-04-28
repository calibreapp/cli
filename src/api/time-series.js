import { request } from './graphql.js'

const TIME_SERIES_QUERY = `
  query TimeSeries(
    $site: String!
    $measurements: [MetricTag!]
    $pages: [String!]
    $profiles: [String!]
    $from: String,
    $to: String
  ) {
    organisation {
      site(slug: $site) {
        timeSeries(from: $from, to: $to, measurements: $measurements, pages: $pages, profiles: $profiles) {
          times {
            name
            snapshot
            timestamp
          }

          series {
            name
            profile
            page
            measurement
            values
          }

          pages {
            uuid
            name
            url
            canonical
          }

          testProfiles {
            uuid
            name
            jsIsDisabled
            adBlockerIsEnabled
            hasDeviceEmulation
            hasBandwidthEmulation
            isMobile
          }

          measurements {
            name
            label
            formatter
            docsPath
          }

          csv
        }
      }
    }
  }
`

const list = async ({
  site,
  measurements = [],
  pages = [],
  profiles = [],
  from,
  to
}) => {
  const response = await request({
    query: TIME_SERIES_QUERY,
    site,
    measurements,
    pages,
    profiles,
    from,
    to
  })
  return response.organisation.site.timeSeries
}

export { list }
