import { request } from './graphql.js'

const CREATE_MUTATION = `
  mutation CreateSite($attributes: SiteInput!){
    createSite(attributes: $attributes) {
      name
      slug

      team {
        name
        slug
      }

      agentSettings {
        location {
          identifier
          name
          shortName
          emoji
          tag
          agents {
            ipv4
          }
        }
        scheduleAnchor
        scheduleInterval
      }

      testProfiles {
        name
        uuid
      }

      pages {
        name
        uuid
      }
    }
  }
`

const LIST_QUERY = `
  query {
    organisation {
      sites {
        name
        slug
        createdAt

        team {
          name
          slug
        }
      }
    }
  }
`

const DELETE_MUTATION = `
  mutation DeleteSite($slug:String!){
    deleteSite(site: $slug) {
      name
      slug
    }
  }
`

const GET_QUERY = `
  query GetSite($slug: String!) {
    organisation {
      site(slug: $slug) {
        slug
        name
        canonicalUrl
        createdAt

        team {
          name
          slug
        }

        authenticationSettings {
          required
          url
          username
          password
          formSelector
          usernameSelector
          passwordSelector
          warningMessage
        }

        headers {
          name
          value
        }

        cookies {
          name
          value
          domain
          path
          secure
          httpOnly
        }
      }
    }
  }
`

const UPDATE_MUTATION = `
  mutation UpdateSiteSettings($slug: String!, $attributes: SiteSettingsInput!){
    updateSiteSettings(site: $slug, attributes: $attributes) {
      slug
      name
      canonicalUrl
      createdAt

      team {
        name
        slug
      }

      authenticationSettings {
        required
        url
        username
        password
        formSelector
        usernameSelector
        passwordSelector
        warningMessage
      }

      headers {
        name
        value
      }


      cookies {
        name
        value
        domain
        path
        secure
        httpOnly
      }
    }
  }
`

const create = async ({
  name,
  location,
  team,
  pages,
  testProfiles,
  agentSettings
}) => {
  // Support deprecated `location` variable
  // Location should now be passed as part of agentSettings
  const updatedAgentSettings = { ...agentSettings }
  if (location) {
    updatedAgentSettings.location = location
  }

  const response = await request({
    query: CREATE_MUTATION,
    attributes: {
      name,
      pages,
      team,
      testProfiles,
      agentSettings: updatedAgentSettings
    }
  })

  return response.createSite
}

const list = async () => {
  const response = await request({ query: LIST_QUERY })
  return response.organisation.sites
}

const destroy = async ({ slug }) => {
  const response = await request({ query: DELETE_MUTATION, slug })
  return response.deleteSite
}

const get = async ({ slug }) => {
  const response = await request({ query: GET_QUERY, slug })
  return response.organisation.site
}

const update = async ({
  slug,
  name,
  canonicalUrl,
  team,
  authenticationSettings,
  cookies,
  headers
}) => {
  const response = await request({
    query: UPDATE_MUTATION,
    slug,
    attributes: {
      name,
      canonicalUrl,
      team,
      authenticationSettings,
      cookies,
      headers
    }
  })

  return response.updateSiteSettings
}

export { create, list, destroy, get, update }
