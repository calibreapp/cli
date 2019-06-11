const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const listr = require('listr')

const download = require('../../utils/download')
const mkdirp = require('../../utils/mkdirp')
const { fetchArtifacts } = require('../../api/snapshot')
const { humaniseError } = require('../../utils/api-error')
const { options } = require('../../utils/cli')

const main = async args => {
  const directories = [
    process.cwd(),
    'snapshot-artifacts',
    args.site,
    String(args.id)
  ]
  const rootPath = path.join(...directories)

  const manifest = {
    site: args.site,
    snapshotId: args.id,
    rootPath,
    tests: []
  }

  try {
    const response = await fetchArtifacts(args)

    if (args.json) return console.log(JSON.stringify(response, null, 2))
    if (!response.snapshot) throw new Error('Snapshot not found')

    let tasks = [
      {
        title: `Creating directory for artifacts: ${path.relative(
          process.cwd(),
          rootPath
        )}`,
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

    for (const test of response.snapshot.tests) {
      const { page, testProfile: profile } = test
      const pageDirectory = mkdirp(
        directories.concat([`${page.name}-${page.uuid}`])
      )

      const profileDirectory = mkdirp(
        [pageDirectory].concat([`${profile.name}-${profile.uuid}`])
      )
      const testManifest = {
        page: {
          uuid: page.uuid,
          name: page.name
        },
        profile: {
          uuid: profile.uuid,
          name: profile.name
        }
      }

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
              task: () => {
                const screenshotPath = path.join(profileDirectory, 'image.jpg')
                testManifest.screenshotPath = path.relative(
                  rootPath,
                  screenshotPath
                )
                return download(test.image, screenshotPath)
              }
            },
            {
              title: 'MP4 Video Render',
              skip: () => {
                if (!test.video) return 'No MP4 Video Render available'
              },
              task: () => {
                const mp4VideoRenderPath = path.join(
                  profileDirectory,
                  'render.mp4'
                )
                testManifest.mp4VideoRenderPath = path.relative(
                  rootPath,
                  mp4VideoRenderPath
                )
                return download(test.video, mp4VideoRenderPath)
              }
            },
            {
              title: 'HAR',
              skip: () => {
                if (!test.har) return 'No HAR available'
              },
              task: () => {
                const harPath = path.join(profileDirectory, 'requests.har')
                testManifest.harPath = path.relative(rootPath, harPath)
                return download(test.har, harPath)
              }
            },
            {
              title: 'Lighthouse Report',
              skip: () => {
                if (!test.lighthouse) return 'No Lighthouse Report available'
              },
              task: () => {
                const lighthousePath = path.join(
                  profileDirectory,
                  'lighthouse.json'
                )
                testManifest.lighthousePath = path.relative(
                  rootPath,
                  lighthousePath
                )
                return download(test.lighthouse, lighthousePath)
              }
            }
          ]

          return new listr(subtasks, { concurrent: true })
        }
      })

      manifest.tests.push(testManifest)
    }

    tasks.push({
      title: 'Saving manifest file',
      task: () => {
        const manifestPath = path.join(...directories, 'manifest.json')
        return fs.writeFile(manifestPath, JSON.stringify(manifest), error => {
          if (error) throw error
        })
      }
    })

    await new listr(tasks).run()

    console.log(`Saved artifacts to ${path.relative(process.cwd(), rootPath)}`)
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
      site: options.site,
      json: options.json
    })
  },
  handler: main
}
