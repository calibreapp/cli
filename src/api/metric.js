const { request } = require('./graphql')

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
        value
      }
    }
  }
`

const list = async () => {
  const response = await request({ query: LIST_QUERY })
  return response.metrics
}

module.exports = {
  list
}
