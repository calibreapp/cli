import { request } from './graphql.js'

const DATE_BIN_MAP = {
  today: 'TODAY',
  day: 'DAY',
  month: 'MONTH'
}

const DEVICE_MAP = {
  desktop: 'DESKTOP',
  mobile: 'MOBILE',
  tablet: 'TABLET'
}

const buildFilter = args => {
  const filter = {}
  if (args.duration) filter.duration = args.duration
  if (args.dateBin) filter.dateBin = DATE_BIN_MAP[args.dateBin]
  if (args.country) filter.countryCode = [args.country]
  if (args.path) filter.path = [args.path]
  if (args.device) filter.deviceType = DEVICE_MAP[args.device]
  if (args.pageGrouping) filter.pageGroupingUuid = [args.pageGrouping]
  return filter
}

const DEFAULT_METRICS = ['lcp', 'cls', 'inp', 'ttfb', 'fcp', 'rtt']

const SUMMARY_QUERY = `
  query GetRumSummary($site: String!, $metrics: [MetricTag!]!, $filter: RumFilterInput) {
    organisation {
      site(slug: $site) {
        monitoringStatus {
          rum
        }
        rum(metrics: $metrics, filter: $filter) {
          liveVisitors
          distinctCountriesCount
          totalCount
          metrics {
            value
            formatter
          }
          aggregate {
            lcp
            lcpGrading
            cls
            clsGrading
            inp
            inpGrading
            fcp
            fcpGrading
            ttfb
            ttfbGrading
            rtt
            rttGrading
            count
            sessionCount
          }
          uxRating {
            metric
            goodPercentage
            needsImprovementPercentage
            poorPercentage
            count
          }
        }
      }
    }
  }
`

const HISTORY_QUERY = `
  query GetRumHistory($site: String!, $metrics: [MetricTag!]!, $filter: RumFilterInput) {
    organisation {
      site(slug: $site) {
        rum(metrics: $metrics, filter: $filter) {
          metrics {
            value
            formatter
          }
          history {
            date
            lcp
            lcpGrading
            cls
            clsGrading
            inp
            inpGrading
            fcp
            fcpGrading
            ttfb
            ttfbGrading
            rtt
            rttGrading
            count
            sessionCount
          }
        }
      }
    }
  }
`

const PAGES_QUERY = `
  query GetRumPages($site: String!, $metrics: [MetricTag!]!, $filter: RumFilterInput, $limit: Int, $offset: Int, $sortBy: String) {
    organisation {
      site(slug: $site) {
        rum(metrics: $metrics, filter: $filter, groupBy: [PATH], limit: $limit, offset: $offset, sortBy: $sortBy) {
          totalCount
          metrics {
            value
            formatter
          }
          aggregate {
            path
            lcp
            lcpGrading
            cls
            clsGrading
            inp
            inpGrading
            fcp
            fcpGrading
            ttfb
            ttfbGrading
            rtt
            rttGrading
            count
            sessionCount
          }
        }
      }
    }
  }
`

const CONFIG_QUERY = `
  query GetRumConfig($site: String!) {
    organisation {
      site(slug: $site) {
        rumConfig {
          enabled
          sampleRate
          allowedOrigins
          endpoint
          identifier
          dataRetentionMonths
          maxDataRetentionMonths
          excludeEu
          createdAt
          updatedAt
          suspendedAt
          systemSuspended
        }
      }
    }
  }
`

const summary = async ({ site, metrics, ...filterArgs }) => {
  const filter = buildFilter(filterArgs)
  const response = await request({
    query: SUMMARY_QUERY,
    site,
    metrics: metrics || DEFAULT_METRICS,
    filter: Object.keys(filter).length > 0 ? filter : undefined
  })
  return response.organisation.site.rum
}

const history = async ({ site, metrics, ...filterArgs }) => {
  const filter = buildFilter(filterArgs)
  const response = await request({
    query: HISTORY_QUERY,
    site,
    metrics: metrics || DEFAULT_METRICS,
    filter: Object.keys(filter).length > 0 ? filter : undefined
  })
  return response.organisation.site.rum
}

const pages = async ({
  site,
  metrics,
  limit,
  offset,
  sortBy,
  ...filterArgs
}) => {
  const filter = buildFilter(filterArgs)
  const response = await request({
    query: PAGES_QUERY,
    site,
    metrics: metrics || DEFAULT_METRICS,
    filter: Object.keys(filter).length > 0 ? filter : undefined,
    limit,
    offset,
    sortBy
  })
  return response.organisation.site.rum
}

const config = async ({ site }) => {
  const response = await request({ query: CONFIG_QUERY, site })
  return response.organisation.site.rumConfig
}

export { summary, history, pages, config }
