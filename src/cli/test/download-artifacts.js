const https = require('https')
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const listr = require('listr')

const { fetchArtifacts } = require('../../api/test')

const { humaniseError } = require('../../utils/api-error')

const download = (url, destination) => {
  return new Promise(resolve => {
    const file = fs.createWriteStream(destination)
    https.get(url, response => {
      if (response.headers['content-encoding'] == 'gzip') {
        response.pipe(zlib.createGunzip()).pipe(file)
      } else {
        response.pipe(file)
      }

      file.on('finish', () => file.close(resolve))
    })
  })
}

const main = async args => {
  try {
    const response = await fetchArtifacts(args.uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    const directories = [process.cwd(), 'test-artifacts', args.uuid]

    directories.reduce((reducePath, dir) => {
      reducePath = path.join(reducePath, dir)
      if (!fs.existsSync(reducePath)) {
        fs.mkdirSync(reducePath)
      }
      return reducePath
    }, '')

    const directory = path.join(...directories)

    const tasks = new listr(
      [
        {
          title: 'Fetching test artifact URLs',
          task: () => Promise.resolve()
        },
        {
          title: 'Screenshot',
          task: () =>
            download(response.image, path.join(directory, 'image.jpg'))
        },
        {
          title: 'GIF Render',
          task: () => download(response.gif, path.join(directory, 'render.gif'))
        },
        {
          title: 'MP4 Video Render',
          task: () =>
            download(response.video, path.join(directory, 'render.mp4'))
        },
        {
          title: 'HAR',
          task: () =>
            download(response.har, path.join(directory, 'requests.har'))
        },
        {
          title: 'Lighthouse Report',
          task: () =>
            download(
              response.lighthouse,
              path.join(directory, 'lighthouse.json')
            )
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
  describe: 'Downloads the artifacts of a test to ./test-artifacts/<uuid>',
  handler: main,
  builder: yargs => {
    yargs.option('json', {
      describe: 'Return the artifact URLS as JSON'
    })
  }
}
