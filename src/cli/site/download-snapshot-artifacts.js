import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import listr from 'listr'

import download from '../../utils/download.js'
import { fetchArtifacts } from '../../api/snapshot.js'
import { humaniseError } from '../../utils/api-error.js'
import { options } from '../../utils/cli.js'

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
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          fs.mkdirSync(directories.join(path.sep), { recursive: true })
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
      const profileDirectoryPath = directories
        .concat(`${page.name.replace(path.sep, '')}-${page.uuid}`)
        .concat([`${profile.name.replace(path.sep, '')}-${profile.uuid}`])
        .join(path.sep)

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const profileDirectory = fs.mkdirSync(profileDirectoryPath, {
        recursive: true
      })

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
        title: `Downloading artifacts (Page: ${page.name}) (Test Profile: ${profile.name})`,

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
        // eslint-disable-next-line security/detect-non-literal-fs-filename
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

const command = 'download-snapshot-artifacts [options]'
const describe =
  'Download the artifacts of a Snapshot to ./snapshot-artifacts/<id>. Includes: lighthouse.json, render progress screenshots, render progress MP4 video, HAR file (request log) and all other metrics and data available through the Calibre interface.'
const builder = {
  site: options.site,
  id: {
    demandOption: true,
    requiresArg: true,
    describe: 'The id of the Snapshot.'
  },
  json: options.json
}
const handler = main

export { command, describe, builder, handler }
