import { request } from './graphql.js'

const FORM_FACTOR_MAP = new Map([
  ['desktop', 'DESKTOP'],
  ['phone', 'PHONE'],
  ['tablet', 'TABLET']
])

const TIME_PERIOD_MAP = new Map([
  ['three-months', 'THREE_MONTHS'],
  ['six-months', 'SIX_MONTHS'],
  ['nine-months', 'NINE_MONTHS'],
  ['twelve-months', 'TWELVE_MONTHS'],
  ['eighteen-months', 'EIGHTEEN_MONTHS'],
  ['twenty-four-months', 'TWENTY_FOUR_MONTHS']
])

const SUMMARY_QUERY = `
  query GetCruxSummary($site: String!, $formFactor: CruxFormFactor) {
    organisation {
      site(slug: $site) {
        cruxCvwAssessment(formFactor: $formFactor)
        cruxFormFactorDensity {
          desktop
          phone
          tablet
        }
        cruxAggregateMetrics(formFactor: $formFactor) {
          name
          value
          grading
          metric {
            label
            formatter
          }
        }
      }
    }
  }
`

const HISTORY_QUERY = `
  query GetCruxHistory($site: String!, $formFactor: CruxFormFactor, $timePeriod: MonthPeriod) {
    organisation {
      site(slug: $site) {
        cruxHistory(formFactor: $formFactor, timePeriod: $timePeriod) {
          metric {
            name
            label
            formatter
          }
          values {
            collectionPeriodStart
            collectionPeriodEnd
            p75Value
            p75Grading
          }
        }
      }
    }
  }
`

const URLS_QUERY = `
  query ListCruxUrls($site: String!, $formFactor: CruxFormFactor) {
    organisation {
      site(slug: $site) {
        cruxUrlsList {
          edges {
            node {
              uuid
              url
              name
              status
              cruxCvwAssessment(formFactor: $formFactor)
              cruxAggregateMetrics(formFactor: $formFactor) {
                name
                value
                grading
                metric {
                  label
                  formatter
                }
              }
            }
          }
        }
      }
    }
  }
`

const URL_QUERY = `
  query GetCruxUrl($site: String!, $uuid: String!, $formFactor: CruxFormFactor, $timePeriod: MonthPeriod) {
    organisation {
      site(slug: $site) {
        cruxUrl(uuid: $uuid) {
          uuid
          url
          name
          status
          cruxCvwAssessment(formFactor: $formFactor)
          cruxFormFactorDensity {
            desktop
            phone
            tablet
          }
          cruxAggregateMetrics(formFactor: $formFactor) {
            name
            value
            grading
            metric {
              label
              formatter
            }
          }
          cruxHistory(formFactor: $formFactor, timePeriod: $timePeriod) {
            metric {
              name
              label
              formatter
            }
            values {
              collectionPeriodStart
              collectionPeriodEnd
              p75Value
              p75Grading
            }
          }
        }
      }
    }
  }
`

const summary = async ({ site, formFactor }) => {
  const variables = { site }
  if (formFactor) variables.formFactor = FORM_FACTOR_MAP.get(formFactor)

  const response = await request({ query: SUMMARY_QUERY, ...variables })
  return response.organisation.site
}

const history = async ({ site, formFactor, timePeriod }) => {
  const variables = { site }
  if (formFactor) variables.formFactor = FORM_FACTOR_MAP.get(formFactor)
  if (timePeriod) variables.timePeriod = TIME_PERIOD_MAP.get(timePeriod)

  const response = await request({ query: HISTORY_QUERY, ...variables })
  return response.organisation.site
}

const urls = async ({ site, formFactor }) => {
  const variables = { site }
  if (formFactor) variables.formFactor = FORM_FACTOR_MAP.get(formFactor)

  const response = await request({ query: URLS_QUERY, ...variables })
  return response.organisation.site
}

const url = async ({ site, uuid, formFactor, timePeriod }) => {
  const variables = { site, uuid }
  if (formFactor) variables.formFactor = FORM_FACTOR_MAP.get(formFactor)
  if (timePeriod) variables.timePeriod = TIME_PERIOD_MAP.get(timePeriod)

  const response = await request({ query: URL_QUERY, ...variables })
  return response.organisation.site
}

export { summary, history, urls, url }
