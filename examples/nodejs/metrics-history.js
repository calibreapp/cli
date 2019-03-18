#!/usr/bin/env node

const { GraphQL } = require('calibre')

const metricsHistory = async () => {
  const query = `
    query MetricsHistory($slug: String!, $measurement: MetricTag!, $page: String!){
      organisation {
        site(slug: $slug) {
          metricsHistory(measurement: $measurement, page: $page) {
            profileName
            current
            previous
          }
        }
      }
    }
  `
  const slug = 'calibre'
  const measurement = 'consistently-interactive'
  const page = 'c993aac8-2623-474c-b7d5-21e203f290e2'

  try {
    const result = await GraphQL.request({ query, slug, measurement, page })
    console.log(JSON.stringify(result, null, 2))
  } catch (e) {
    console.log(JSON.stringify(e, null, 2))
  }
}

metricsHistory()
