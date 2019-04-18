const path = require('path')

const listr = require('listr')

const download = require('../../utils/download')
const mkdirp = require('../../utils/mkdirp')
const { fetchArtifacts } = require('../../api/test')
const { humaniseError } = require('../../utils/api-error')

const main = async args => {
  try {
    const response = await fetchArtifacts(args.uuid)

    if (args.json) return console.log(JSON.stringify(response, null, 2))

    const directories = [process.cwd(), 'test-artifacts', args.uuid]
    const directory = mkdirp(directories)

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

    console.log(`Saved artifacts to ${path.relative(process.cwd(), directory)}`)
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
