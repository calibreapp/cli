const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

const CREATE_MUTATION = `
  mutation CreateTestProfile($site: String!, $attributes: TestProfileInput!) {
    createTestProfile(site: $site, attributes: $attributes) {
      uuid
      name
    }
  }
`

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

const create = async ({
  site,
  name,
  device,
  connection,
  cookies,
  jsIsDisabled
}) => {
  try {
    const response = await gql.request(CREATE_MUTATION, {
      site,
      attributes: {
        name,
        device,
        connection,
        cookies,
        jsIsDisabled
      }
    })

    return response.createTestProfile
  } catch (e) {
    return handleError(e)
  }
}

const list = async ({ site }) => {
  try {
    const response = await gql.request(LIST_QUERY, { site })
    return response.organisation.site.testProfiles
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  list
}
