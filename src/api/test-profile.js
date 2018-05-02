const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

const CREATE_MUTATION = `
  mutation CreateTestProfile($site: String!, $attributes: TestProfileInput!) {
    createTestProfile(site: $site, attributes: $attributes) {
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
        value
        domain
        path
        secure
        httpOnly
      }
      updatedAt
      createdAt
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

const UPDATE_MUTATION = `
  mutation UpdateTestProfile($site: String!, $uuid: String!, $attributes: TestProfileInput!){
    updateTestProfile(site: $site, uuid: $uuid, attributes: $attributes) {
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
        value
        domain
        path
        secure
        httpOnly
      }
      updatedAt
      createdAt
    }
  }
`

const DELETE_MUTATION = `
  mutation DeleteTestProfile($site:String!, $uuid: String!){
    deleteTestProfile(site: $site, uuid: $uuid) {
      name
      uuid
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

const update = async ({
  uuid,
  site,
  name,
  device,
  connection,
  cookies,
  jsIsDisabled
}) => {
  try {
    const response = await gql.request(UPDATE_MUTATION, {
      uuid,
      site,
      attributes: {
        name,
        device,
        connection,
        cookies,
        jsIsDisabled
      }
    })

    return response.updateTestProfile
  } catch (e) {
    return handleError(e)
  }
}

const destroy = async ({ site, uuid }) => {
  try {
    const response = await gql.request(DELETE_MUTATION, { site, uuid })
    return response.deleteTestProfile
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  list,
  update,
  destroy
}
