const https = require('https')
const fs = require('fs')

const listr = require('listr')

const { fetchArtifacts } = require('../../api/test')

const { humaniseError } = require('../../utils/api-error')

const download = (url, destination) => {
  return new Promise(resolve => {
    const file = fs.createWriteStream(destination)
    https.get(url, response => {
      response.pipe(file)
      file.on('finish', () => {
        file.close(resolve)
      })
    })
  })
}

const main = async args => {
  try {
    const response = await fetchArtifacts(args.uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    const directory = `${process.cwd()}/${args.uuid}`

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }

    const tasks = new listr(
      [
        {
          title: 'Fetching test artifact URLs',
          task: () => Promise.resolve()
        },
        {
          title: 'Downloading Screenshot',
          task: () => download(response.image, `${directory}/image.jpg`)
        },
        {
          title: 'Downloading GIF',
          task: () => download(response.gif, `${directory}/render.gif`)
        },
        {
          title: 'Downloading Video',
          task: () => download(response.video, `${directory}/render.mp4`)
        },
        {
          title: 'Downloading HAR',
          task: () => download(response.har, `${directory}/requests.har`)
        },
        {
          title: 'Downloading Lighthouse report',
          task: () =>
            download(response.lighthouse, `${directory}/lighthouse.json`)
        }
      ],
      {
        concurrent: true
      }
    )

    await tasks.run()

    console.log('Saved artifacts to', directory)
  } catch (e) {
    throw new Error(humaniseError(e))
  }
}

module.exports = {
  command: 'download-artifacts <uuid>',
  describe: 'Downloads the artifacts of a test to ./<uuid>',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the artifact URLS as JSON'
    })
  }
}
