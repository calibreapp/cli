const gql = require('../utils/api-client')

const LIST_QUERY = `
  query ListTestProfiles($site: String!) {
    organisation {
      site(slug: $site) {
        testProfiles {
          uuid
          name
          jsIsDisabled

          device {
            title
          }
          bandwidth {
            title
          }
          cookies {
            name
          }
        }
      }
    }
  }
`
const list = async ({ site }) => {
  try {
    const response = await gql.request(LIST_QUERY, { site })
    return response.organisation.site.testProfiles
  } catch (e) {
    throw e.response.errors
  }
}

module.exports = {
  list
}
