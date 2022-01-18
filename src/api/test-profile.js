const { request } = require('./graphql')

const CREATE_MUTATION = `
  mutation CreateTestProfile($site: String!, $attributes: TestProfileInput!) {
    createTestProfile(site: $site, attributes: $attributes) {
      uuid
      name
      jsIsDisabled
      adBlockerIsEnabled
      hasDeviceEmulation
      hasBandwidthEmulation
      isMobile
      position

      device {
        tag
        title
      }

      bandwidth {
        tag
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

      headers {
        name
        value
      }

      blockedThirdParties {
        name
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
          adBlockerIsEnabled
          hasDeviceEmulation
          hasBandwidthEmulation
          isMobile
          position

          device {
            tag
            title
          }

          bandwidth {
            tag
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

          headers {
            name
            value
          }

          blockedThirdParties {
            name
          }

          updatedAt
          createdAt
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
      adBlockerIsEnabled
      hasDeviceEmulation
      hasBandwidthEmulation
      isMobile
      position

      device {
        tag
        title
      }

      bandwidth {
        tag
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

      headers {
        name
        value
      }

      blockedThirdParties {
        name
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
  javascript,
  adblocker
}) => {
  const response = await request({
    query: CREATE_MUTATION,
    site,
    attributes: {
      name,
      device,
      connection,
      cookies,
      jsIsDisabled: !javascript,
      adBlockerIsEnabled: adblocker
    }
  })

  return response.createTestProfile
}

const list = async ({ site }) => {
  const response = await request({ query: LIST_QUERY, site })
  return response.organisation.site.testProfiles
}

const update = async ({
  uuid,
  site,
  name,
  device,
  connection,
  cookies,
  headers,
  blockedThirdParties,
  javascript,
  adblocker,
  position
}) => {
  const response = await request({
    query: UPDATE_MUTATION,
    uuid,
    site,
    attributes: {
      name,
      device,
      connection,
      cookies,
      headers,
      blockedThirdParties,
      jsIsDisabled: !javascript,
      adBlockerIsEnabled: adblocker,
      position
    }
  })
  return response.updateTestProfile
}

const destroy = async ({ site, uuid }) => {
  const response = await request({ query: DELETE_MUTATION, site, uuid })
  return response.deleteTestProfile
}

module.exports = {
  create,
  list,
  update,
  destroy
}
