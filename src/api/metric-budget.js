const { request } = require('./graphql')

const CREATE_MUTATION = `
  mutation CreateMetricBudget($organisation: String, $site: String!, $attributes: MetricBudgetInput!){
    createMetricBudget(organisation: $organisation, site: $site, attributes: $attributes) {
      uuid
      measurement
      value
      status
      changeThreshold

      budgets {
        page {
          uuid
          name
        }
        profile {
          uuid
          name
        }
        lastObservedValue
        withinBudget
      }
    }
  }
`

const DELETE_MUTATION = `
  mutation DeleteMetricBudget($organisation: String, $site:String!, $uuid: String!){
    deleteMetricBudget(organisation: $organisation, site: $site, uuid: $uuid) {
      uuid
    }
  }
`

const UPDATE_MUTATION = `
  mutation UpdateMetricBudget($site:String!, $uuid: String!, $attributes: MetricBudgetInput!){
    updateMetricBudget(site: $site, uuid: $uuid, attributes: $attributes) {
      uuid
      measurement
      value
      status
      changeThreshold

      budgets {
        page {
          uuid
          name
        }
        profile {
          uuid
          name
        }
        lastObservedValue
        withinBudget
      }
    }
  }
`
const LIST_QUERY = `
  query ListMetricBudgets(
    $site: String!
    $count: Int!
    $cursor: String
    $metric: MetricTag
  ) {
    organisation {
      site(slug: $site) {
        metricBudgetsList(metric: $metric, first: $count, after: $cursor) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
            startCursor
          }

          edges {
            node {
              uuid
              measurement
              value
              status
              changeThreshold

              metric {
                name
                value
              }

              budgets {
                page {
                  uuid
                  name
                }
                profile {
                  uuid
                  name
                }
                lastObservedValue
                withinBudget
              }
            }
          }
        }
      }
    }
  }
`

const create = async ({ site, value, measurement, pages, profiles }) => {
  const response = await request({
    query: CREATE_MUTATION,
    site,
    attributes: {
      value,
      measurement,
      pages,
      profiles
    }
  })
  return response.createMetricBudget
}

const destroy = async ({ site, uuid }) => {
  const response = await request({
    query: DELETE_MUTATION,
    site,
    uuid
  })
  return response.deleteMetricBudget
}

const update = async ({ site, uuid, value, measurement, pages, profiles }) => {
  const response = await request({
    query: UPDATE_MUTATION,
    site,
    uuid,
    attributes: {
      value,
      measurement,
      pages,
      profiles
    }
  })

  return response.updateMetricBudget
}

const list = async ({ site, metric, count, cursor }) => {
  const response = await request({
    query: LIST_QUERY,
    site,
    metric,
    count,
    cursor
  })

  return {
    metricBudgets: response.organisation.site.metricBudgetsList.edges.map(
      edge => edge.node
    ),
    pageInfo: response.organisation.site.metricBudgetsList.pageInfo
  }
}

module.exports = {
  create,
  destroy,
  update,
  list
}
