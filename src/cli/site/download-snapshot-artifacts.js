const path = require('path')
const chalk = require('chalk')
const listr = require('listr')

const download = require('../../utils/download')
const mkdirp = require('../../utils/mkdirp')
const { fetchArtifacts } = require('../../api/snapshot')
const { humaniseError } = require('../../utils/api-error')

const main = async args => {
  const directories = [
    process.cwd(),
    'snapshot-artifacts',
    args.site,
    String(args.id)
  ]

  try {
    const response = await fetchArtifacts(args)

    if (args.json) return console.log(JSON.stringify(response, null, 2))
    if (!response.snapshot) throw new Error('Snapshot not found')

    let tasks = [
      {
        title: `Creating directory for artifacts: ${path.join(...directories)}`,
        task: () => {
          mkdirp(directories)
          return Promise.resolve()
        }
      },
      {
        title: `Fetching artifacts for ${chalk.bold(
          `Snapshot #${args.id} -- ${response.snapshot.tests.length} tests`
        )}`,
        task: () => Promise.resolve()
      }
    ]

    for await (const page of response.pages) {
      const pageDirectory = mkdirp(
        directories.concat([`${page.name}-${page.uuid}`])
      )

      for await (const profile of response.testProfiles) {
        const test = response.snapshot.tests.find(
          test =>
            test.page.uuid == page.uuid && test.testProfile.uuid == profile.uuid
        )

        if (test) {
          const profileDirectory = mkdirp(
            [pageDirectory].concat([`${profile.name}-${profile.uuid}`])
          )

          tasks.push({
            title: `Downloading artifacts (Page: ${page.name}) (Test Profile: ${
              profile.name
            })`,

            task: () => {
              const subtasks = [
                {
                  title: 'Screenshot',
                  skip: () => {
                    if (!test.image) return 'No screenshot available'
                  },
                  task: () =>
                    download(
                      test.image,
                      path.join(profileDirectory, 'image.jpg')
                    )
                },
                {
                  title: 'GIF Render',
                  skip: () => {
                    if (!test.gif) return 'No GIF Render available'
                  },
                  task: () =>
                    download(
                      test.gif,
                      path.join(profileDirectory, 'render.gif')
                    )
                },
                {
                  title: 'MP4 Video Render',
                  skip: () => {
                    if (!test.video) return 'No MP4 Video Render available'
                  },
                  task: () =>
                    download(
                      test.video,
                      path.join(profileDirectory, 'render.mp4')
                    )
                },
                {
                  title: 'HAR',
                  skip: () => {
                    if (!test.har) return 'No HAR available'
                  },
                  task: () =>
                    download(
                      test.har,
                      path.join(profileDirectory, 'requests.har')
                    )
                },
                {
                  title: 'Lighthouse Report',
                  skip: () => {
                    if (!test.lighthouse)
                      return 'No Lighthouse Report available'
                  },
                  task: () =>
                    download(
                      test.lighthouse,
                      path.join(profileDirectory, 'lighthouse.json')
                    )
                }
              ]

              return new listr(subtasks, { concurrent: true })
            }
          })
        }
      }
    }

    await new listr(tasks).run()
  } catch (error) {
    throw new Error(humaniseError(error))
  }
}

module.exports = {
  command: 'download-snapshot-artifacts [options]',
  describe:
    'Downloads the artifacts of a snapshot to ./snapshot-artifacts/<id>',
  builder: yargs => {
    yargs.options({
      id: { demandOption: true, describe: 'The id of the snapshot' },
      site: {
        demandOption: true,
        describe: 'The identifying slug of a site'
      },
      json: { describe: 'Return the snapshot attributes as JSON' }
    })
  },
  handler: main
}
