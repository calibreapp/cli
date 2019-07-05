#!/usr/bin/env node

const { AgentSettings } = require('calibre')

const updateAgentSettings = async () => {
  const site = 'calibre' // site slug
  const scheduleAnchor = 6 // number of hours
  const scheduleInterval = 'every_x_hours' // options: off, daily, hourly, every_x_hours
  const location = 'NorthVirginia' // location tag

  // Update the agent settings
  const agentSettings = await AgentSettings.update({
    site,
    scheduleAnchor,
    scheduleInterval,
    location
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(agentSettings, null, 2))
}

updateAgentSettings()
