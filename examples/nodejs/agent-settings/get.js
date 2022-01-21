#!/usr/bin/env node

const { AgentSettings } = require('calibre')

const getAgentSettings = async () => {
  const site = 'calibre' // site slug

  // Get the agent settings
  const agentSettings = await AgentSettings.get({
    site
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(agentSettings, null, 2))
}

getAgentSettings()
