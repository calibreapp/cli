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

const QUERIES = {
  synthetic: LIST_QUERY,
  crux: CRUX_METRICS_QUERY,
  rum: RUM_METRICS_QUERY
}

const RESPONSE_KEYS = {
  synthetic: 'metrics',
  crux: 'cruxMetrics',
  rum: 'rumMetrics'
}

const list = async ({ type } = {}) => {
  const query = QUERIES[type] || LIST_QUERY
  const responseKey = RESPONSE_KEYS[type] || 'metrics'
  const response = await request({ query })
  return response[responseKey]
}

export { list }
