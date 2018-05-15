const ora = require('ora')

const { create } = require('../../api/site')
const { humaniseError } = require('../../utils/api-error')

const main = async function(args) {
  let spinner

  if (!args.json) {
    spinner = ora('Connecting to Calibre')
    spinner.color = 'magenta'
    spinner.start()
  }

  const { name, location, url } = args
  const pages = [
    {
      url,
      name: 'Home',
      canonical: true
    }
  ]

  try {
    const site = await create({ name, location, pages })

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

module.exports = {
  command: 'create <name> [options]',
  describe: 'Add a site for Calibre to monitor',
  builder: yargs => {
    yargs
      .option('url', {
        describe: 'The homepage URL for this site'
      })
      .option('location', {
        describe: 'Calibre will monitor from this location'
      })
      .option('json', {
        describe: 'Return the site attributes as JSON'
      })
      .demandOption(
        'url',
        'Please provide the URL of the homepage for this site'
      )
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
  },
  handler: main
}
