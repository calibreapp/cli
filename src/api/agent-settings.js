const { request } = require('./graphql')

const UPDATE_MUTATION = `
  mutation UpdateAgentSettings($organisation: String, $site: String!, $attributes: AgentSettingsInput!) {
    updateAgentSettings(organisation: $organisation, site: $site, attributes: $attributes) {
      location {
        tag
      }
      scheduleAnchor
      scheduleInterval
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

module.exports = {
  update
}
