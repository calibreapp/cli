import * as SiteCreate from './site/create.js'
import * as SiteList from './site/list.js'
import * as SiteDelete from './site/delete.js'

import * as SyntheticPages from './synthetic/pages.js'
import * as SyntheticCreatePage from './synthetic/create-page.js'
import * as SyntheticUpdatePage from './synthetic/update-page.js'
import * as SyntheticDeletePage from './synthetic/delete-page.js'
import * as SyntheticSnapshots from './synthetic/snapshots.js'
import * as SyntheticCreateSnapshot from './synthetic/create-snapshot.js'
import * as SyntheticDeleteSnapshot from './synthetic/delete-snapshot.js'
import * as SyntheticDownloadArtifacts from './synthetic/download-artifacts.js'
import * as SyntheticGetSnapshotMetrics from './synthetic/get-snapshot-metrics.js'
import * as SyntheticMetrics from './synthetic/metrics.js'
import * as SyntheticTestProfiles from './synthetic/test-profiles.js'
import * as SyntheticCreateTestProfile from './synthetic/create-test-profile.js'
import * as SyntheticUpdateTestProfile from './synthetic/update-test-profile.js'
import * as SyntheticDeleteTestProfile from './synthetic/delete-test-profile.js'
import * as SyntheticPullRequestReviews from './synthetic/pull-request-reviews.js'
import * as SyntheticCreatePullRequestReview from './synthetic/create-pull-request-review.js'
import * as SyntheticPullRequestReview from './synthetic/pull-request-review.js'

import * as DeployList from './deploy/list.js'
import * as DeployCreate from './deploy/create.js'
import * as DeployDelete from './deploy/delete.js'

import { deprecatedHandler } from '../utils/deprecation.js'

const commands = [SiteCreate, SiteList, SiteDelete]

const deprecatedCommands = [
  {
    command: 'pages [options]',
    describe: false,
    builder: SyntheticPages.builder,
    handler: deprecatedHandler(
      'site pages',
      'synthetic pages',
      SyntheticPages.handler
    )
  },
  {
    command: 'create-page <name> [options]',
    describe: false,
    builder: SyntheticCreatePage.builder,
    handler: deprecatedHandler(
      'site create-page',
      'synthetic create-page',
      SyntheticCreatePage.handler
    )
  },
  {
    command: 'update-page [options]',
    describe: false,
    builder: SyntheticUpdatePage.builder,
    handler: deprecatedHandler(
      'site update-page',
      'synthetic update-page',
      SyntheticUpdatePage.handler
    )
  },
  {
    command: 'delete-page [options]',
    describe: false,
    builder: SyntheticDeletePage.builder,
    handler: deprecatedHandler(
      'site delete-page',
      'synthetic delete-page',
      SyntheticDeletePage.handler
    )
  },
  {
    command: 'snapshots [options]',
    describe: false,
    builder: SyntheticSnapshots.builder,
    handler: deprecatedHandler(
      'site snapshots',
      'synthetic snapshots',
      SyntheticSnapshots.handler
    )
  },
  {
    command: 'create-snapshot [options]',
    describe: false,
    builder: SyntheticCreateSnapshot.builder,
    handler: deprecatedHandler(
      'site create-snapshot',
      'synthetic create-snapshot',
      SyntheticCreateSnapshot.handler
    )
  },
  {
    command: 'delete-snapshot [options]',
    describe: false,
    builder: SyntheticDeleteSnapshot.builder,
    handler: deprecatedHandler(
      'site delete-snapshot',
      'synthetic delete-snapshot',
      SyntheticDeleteSnapshot.handler
    )
  },
  {
    command: 'download-snapshot-artifacts [options]',
    describe: false,
    builder: SyntheticDownloadArtifacts.builder,
    handler: deprecatedHandler(
      'site download-snapshot-artifacts',
      'synthetic download-artifacts',
      SyntheticDownloadArtifacts.handler
    )
  },
  {
    command: 'get-snapshot-metrics [options]',
    describe: false,
    builder: SyntheticGetSnapshotMetrics.builder,
    handler: deprecatedHandler(
      'site get-snapshot-metrics',
      'synthetic get-snapshot-metrics',
      SyntheticGetSnapshotMetrics.handler
    )
  },
  {
    command: 'metrics [options]',
    describe: false,
    builder: SyntheticMetrics.builder,
    handler: deprecatedHandler(
      'site metrics',
      'synthetic metrics',
      SyntheticMetrics.handler
    )
  },
  {
    command: 'test-profiles [options]',
    describe: false,
    builder: SyntheticTestProfiles.builder,
    handler: deprecatedHandler(
      'site test-profiles',
      'synthetic test-profiles',
      SyntheticTestProfiles.handler
    )
  },
  {
    command: 'create-test-profile <name> [options]',
    describe: false,
    builder: SyntheticCreateTestProfile.builder,
    handler: deprecatedHandler(
      'site create-test-profile',
      'synthetic create-test-profile',
      SyntheticCreateTestProfile.handler
    )
  },
  {
    command: 'update-test-profile [options]',
    describe: false,
    builder: SyntheticUpdateTestProfile.builder,
    handler: deprecatedHandler(
      'site update-test-profile',
      'synthetic update-test-profile',
      SyntheticUpdateTestProfile.handler
    )
  },
  {
    command: 'delete-test-profile [options]',
    describe: false,
    builder: SyntheticDeleteTestProfile.builder,
    handler: deprecatedHandler(
      'site delete-test-profile',
      'synthetic delete-test-profile',
      SyntheticDeleteTestProfile.handler
    )
  },
  {
    command: 'pull-request-reviews [options]',
    describe: false,
    builder: SyntheticPullRequestReviews.builder,
    handler: deprecatedHandler(
      'site pull-request-reviews',
      'synthetic pull-request-reviews',
      SyntheticPullRequestReviews.handler
    )
  },
  {
    command: 'create-pull-request-review [options]',
    describe: false,
    builder: SyntheticCreatePullRequestReview.builder,
    handler: deprecatedHandler(
      'site create-pull-request-review',
      'synthetic create-pull-request-review',
      SyntheticCreatePullRequestReview.handler
    )
  },
  {
    command: 'pull-request-review <branch>',
    describe: false,
    builder: SyntheticPullRequestReview.builder,
    handler: deprecatedHandler(
      'site pull-request-review',
      'synthetic pull-request-review',
      SyntheticPullRequestReview.handler
    )
  },
  {
    command: 'deploys [options]',
    describe: false,
    builder: DeployList.builder,
    handler: deprecatedHandler(
      'site deploys',
      'deploy list',
      DeployList.handler
    )
  },
  {
    command: 'create-deploy [options]',
    describe: false,
    builder: DeployCreate.builder,
    handler: deprecatedHandler(
      'site create-deploy',
      'deploy create',
      DeployCreate.handler
    )
  },
  {
    command: 'delete-deploy [options]',
    describe: false,
    builder: DeployDelete.builder,
    handler: deprecatedHandler(
      'site delete-deploy',
      'deploy delete',
      DeployDelete.handler
    )
  }
]

const command = 'site <command>'
const desc = 'Manage your Sites.'
const builder = yargs => yargs.commands([...commands, ...deprecatedCommands])
const handler = () => {}

export { command, desc, builder, handler, commands }
