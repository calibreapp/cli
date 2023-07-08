import * as SiteCreate from './site/create.js'
import * as SiteList from './site/list.js'
import * as SiteDownloadSnapshotArtifacts from './site/download-snapshot-artifacts.js'
import * as SiteGetSnapshotMetrics from './site/get-snapshot-metrics.js'
import * as SiteGetMetrics from './site/metrics.js'
import * as SiteListDeploys from './site/deploys.js'
import * as SiteCreateDeploy from './site/create-deploy.js'
import * as SiteDeleteDeploy from './site/delete-deploy.js'
import * as SiteListPages from './site/pages.js'
import * as SiteCreatePage from './site/create-page.js'
import * as SiteUpdatePage from './site/update-page.js'
import * as SiteDeletePage from './site/delete-page.js'
import * as SiteListSnapshots from './site/snapshots.js'
import * as SiteCreateSnapshot from './site/create-snapshot.js'
import * as SiteDeleteSnapshot from './site/delete-snapshot.js'
import * as SiteListTestProfiles from './site/test-profiles.js'
import * as SiteCreateTestProfile from './site/create-test-profile.js'
import * as SiteUpdateTestProfile from './site/update-test-profile.js'
import * as SiteDeleteTestProfile from './site/delete-test-profile.js'
import * as SiteCreatePullRequestReview from './site/create-pull-request-review.js'
import * as SiteListPullRequestReviews from './site/pull-request-reviews.js'

const commands = [
  SiteCreate,
  SiteList,
  SiteDownloadSnapshotArtifacts,
  SiteGetSnapshotMetrics,
  SiteGetMetrics,
  SiteListDeploys,
  SiteCreateDeploy,
  SiteDeleteDeploy,
  SiteListPages,
  SiteCreatePage,
  SiteUpdatePage,
  SiteDeletePage,
  SiteListSnapshots,
  SiteCreateSnapshot,
  SiteDeleteSnapshot,
  SiteListTestProfiles,
  SiteCreateTestProfile,
  SiteUpdateTestProfile,
  SiteDeleteTestProfile,
  SiteCreatePullRequestReview,
  SiteListPullRequestReviews
]

const command = 'site <command>'
const desc =
  'Use the site command to manage your Sites, Pages, Test Profiles, Pull Request Reviews, Deploys, Snapshots, and download monitoring data.'
const builder = yargs => {
  return yargs.commands(commands)
}
const handler = () => {}

export { command, desc, builder, handler, commands }
