const { request } = require('./graphql')

const TIME_SERIES_QUERY = `
  query TimeSeries(
    $site: String!
    $measurements: [MetricTag!]
    $pages: [String!]
    $from: String,
    $to: String
  ) {
    organisation {
      timeSeries(site: $site, from: $from, to: $to, measurements: $measurements, pages: $pages) {
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
`

const list = async ({ site, measurements = [], pages = [], from, to }) => {
  const response = await request({
    query: TIME_SERIES_QUERY,
    site,
    measurements,
    pages,
    from,
    to
  })
  return response.organisation.timeSeries
}

module.exports = {
  list
}
