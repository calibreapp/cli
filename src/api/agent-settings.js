import { request } from './graphql.js'

const UPDATE_MUTATION = `
  mutation UpdateAgentSettings($site: String!, $attributes: AgentSettingsInput!) {
    updateAgentSettings(site: $site, attributes: $attributes) {
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
  }

`

const GET = `
  query GetAgentSettings($site: String!) {
    organisation{
      site(slug: $site) {
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
      }
    }
  }
`

const update = async ({ site, scheduleAnchor, scheduleInterval, location }) => {
  const response = await request({
    query: UPDATE_MUTATION,
    site,
    attributes: {
      scheduleAnchor,
      scheduleInterval,
      location
    }
  })
  return response.updateAgentSettings
}

const get = async ({ site }) => {
  const response = await request({ query: GET, site })
  return response.organisation.site.agentSettings
}

export { get, update }
