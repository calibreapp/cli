import * as Pages from './synthetic/pages.js'
import * as CreatePage from './synthetic/create-page.js'
import * as UpdatePage from './synthetic/update-page.js'
import * as DeletePage from './synthetic/delete-page.js'
import * as Snapshots from './synthetic/snapshots.js'
import * as CreateSnapshot from './synthetic/create-snapshot.js'
import * as DeleteSnapshot from './synthetic/delete-snapshot.js'
import * as DownloadArtifacts from './synthetic/download-artifacts.js'
import * as GetSnapshotMetrics from './synthetic/get-snapshot-metrics.js'
import * as Metrics from './synthetic/metrics.js'
import * as TestProfiles from './synthetic/test-profiles.js'
import * as CreateTestProfile from './synthetic/create-test-profile.js'
import * as UpdateTestProfile from './synthetic/update-test-profile.js'
import * as DeleteTestProfile from './synthetic/delete-test-profile.js'
import * as PullRequestReviews from './synthetic/pull-request-reviews.js'
import * as CreatePullRequestReview from './synthetic/create-pull-request-review.js'
import * as PullRequestReview from './synthetic/pull-request-review.js'
import * as Connections from './synthetic/connections.js'
import * as Devices from './synthetic/devices.js'
import * as Locations from './synthetic/locations.js'

const commands = [
  Pages,
  CreatePage,
  UpdatePage,
  DeletePage,
  Snapshots,
  CreateSnapshot,
  DeleteSnapshot,
  DownloadArtifacts,
  GetSnapshotMetrics,
  Metrics,
  TestProfiles,
  CreateTestProfile,
  UpdateTestProfile,
  DeleteTestProfile,
  PullRequestReviews,
  CreatePullRequestReview,
  PullRequestReview,
  Connections,
  Devices,
  Locations
]

const command = 'synthetic <command>'
const desc =
  'Synthetic monitoring — manage scheduled Lighthouse tests, Pages, Test Profiles, Snapshots, and Pull Request Reviews.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
