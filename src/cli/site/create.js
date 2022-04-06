import ora from 'ora'
import { URL } from 'url'

import { create } from '../../api/site'
import { humaniseError } from '../../utils/api-error'

const main = async function (args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  const { name, location, url, team, schedule, interval } = args
  const pages = [
    {
      url,
      name: 'Home'
    }
  ]

  const agentSettings = {
    location,
    scheduleInterval: schedule,
    scheduleAnchor: interval
  }

  const testProfiles = [
    {
      name: 'Chrome Desktop',
      connection: 'cable'
    },
    {
      name: 'MotoG4, 3G connection',
      device: 'MotorolaMotoG4',
      connection: 'regular3G'
    },
    {
      name: 'iPhone, 4G LTE',
      device: 'iPhone8',
      connection: 'LTE'
    }
  ]

  try {
    const site = await create({
      name,
      team,
      pages,
      agentSettings,
      testProfiles
    })

    if (!args.json) {
      spinner.succeed(`${site.name} added to Calibre`)
    } else {
      return console.log(JSON.stringify(site, null, 2))
    }
  } catch (e) {
    if (args.json) return console.error(e)
    spinner.fail()
    throw new Error(humaniseError(e))
  }
}

const command = 'create <name> [options]'
const describe = 'Add a site for Calibre to monitor'
const builder = yargs => {
  yargs
    .option('url', {
      describe: 'The homepage URL for this site'
    })
    .option('location', {
      describe: 'Calibre will monitor from this location'
    })
    .option('team', {
      describe: 'The identifying slug of the team'
    })
    .option('schedule', {
      describe:
        'Schedule for automated snapshots. One of: hourly, daily, every_x_hours',
      default: 'every_x_hours'
    })
    .option('interval', {
      describe:
        "Automated snapshot interval. UTC hour of day for 'daily', hour interval for 'every_x_hours'",
      default: 6
    })
    .option('json', {
      describe: 'Return the site attributes as JSON'
    })
    .demandOption('url', 'Please provide the URL of the homepage for this site')
    .demandOption(
      'location',
      'Please provide the location your site should be tested from'
    )
    .check(({ url, location }) => {
      if (!url.length) return new Error('Please provide a URL')

      try {
        new URL(url)
      } catch (e) {
        return new Error('Please enter a valid URL')
      }

      if (!location) return new Error('Please set --location')

      return true
    })
}
const handler = main

export { command, describe, builder, handler }
