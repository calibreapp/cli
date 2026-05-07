import { request } from './graphql.js'

const LIST_QUERY = `
  query {
    metrics {
      __typename
      name
      value
      label
      shortLabel
      budgetThreshold
      formatter
      docsPath
      goodStop
      poorStop
      recommended
      category {
        name
        label
      }
    }
  }
`

const CRUX_METRICS_QUERY = `
  query {
    cruxMetrics {
      __typename
      name
      value
      label
      shortLabel
      budgetThreshold
      formatter
      docsPath
      goodStop
      poorStop
      recommended
      category {
        name
        label
      }
    }
  }
`

const RUM_METRICS_QUERY = `
  query {
    rumMetrics {
      __typename
      name
      value
      label
      shortLabel
      budgetThreshold
      formatter
      docsPath
      goodStop
      poorStop
      recommended
    }
  }
`

const TYPES = new Map([
  ['synthetic', { query: LIST_QUERY, extract: r => r.metrics }],
  ['crux', { query: CRUX_METRICS_QUERY, extract: r => r.cruxMetrics }],
  ['rum', { query: RUM_METRICS_QUERY, extract: r => r.rumMetrics }]
])

const DEFAULT_TYPE = { query: LIST_QUERY, extract: r => r.metrics }

const list = async ({ type } = {}) => {
  const { query, extract } = TYPES.get(type) || DEFAULT_TYPE
  const response = await request({ query })
  return extract(response)
}

export { list }
