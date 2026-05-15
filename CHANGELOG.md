# 8.0.0 (Unpublished)

## ⚠️ Breaking changes

- Minimum Node.js version is now 22.13.0 (previously 20, which is now EOL).
- Removed commands that were deprecated in 7.0.0. There are alternatives for all removed commands. See the 7.0.0 release notes for details.
- Remove CommonJS exports. The package is now ESM-only. Use `import` instead of `require()`.

## 🚩 Enhancements

- Add support for project-level `calibre.json`, e.g.: `{ "site": "my-site-slug" }` to avoid having to pass `--site` for every command.
- Commands that have pagination now support an `--all` flag, which will automatically paginate through all results and return a complete list.
- Use consistent JSON error output.
- Use consistent table formatting.
- Use consistent date parsing.

## 🧹 Housekeeping

- Replaced `chalk` with Node.js built-in `node:util` `styleText` for terminal colouring.
- Replaced `ora` with `nanospinner` for terminal spinners.
- Removed `log-symbols` dependency in favour of Unicode characters.
- Updated CI matrix to test Node.js 22, 24, and 26.

# 7.0.0 (2026-05-07)

## ⚠️ Major release with breaking changes

This is a major release that restructures the CLI command hierarchy to namespace **Synthetic** commands under `calibre synthetic`, and introduces **CrUX** `calibre crux`, and **RUM** `calibre rum` subcommands.

All existing functionality remains available, but some commands have moved to new locations. Deprecated aliases with warnings are provided for all moved commands to ensure a smooth transition.

### Command Restructuring

- All synthetic monitoring commands are moved from `calibre site <command>` to `calibre synthetic <command>`
- New top-level `calibre rum <command>` for Real User Metrics data
- New top-level `calibre crux <command>` for Chrome User Experience Report data
- Site settings and config commands remain under `calibre site`
- Deploys have been elevated to a top-level `calibre deploy <command>`, renaming `calibre site *-deploy` commands to `calibre deploy <command>`
- Synthetic `connection-list`, `device-list`, and `location-list` commands are now `calibre synthetic connections`, `calibre synthetic devices`, and `calibre synthetic locations` respectively

#### Unchanged

These commands remain exactly where they are:

- `calibre metrics-list`
- `calibre site list`
- `calibre site create`
- `calibre site delete`
- `calibre test create`
- `calibre test list`
- `calibre test show`
- `calibre test download-artifacts`
- `calibre team list`
- `calibre token set`
- `calibre token remove`
- `calibre request`

---

## 🚩 New Commands

### `calibre rum` — Real User Metrics

Real User Session performance data collected from visitors on your website via the Calibre RUM snippet. Provides live visitor counts, aggregate web vitals, UX ratings, page-level breakdowns, and historical trends.

#### `calibre rum summary`

Display the RUM dashboard overview: live visitors, aggregate metrics, and UX ratings.

```
calibre rum summary --site=<slug> [options]
```

| Flag              | Description                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| `--site`          | **(required)** The site slug                                            |
| `--metrics`       | Metrics to query (space-separated). Default: `lcp cls inp ttfb fcp rtt` |
| `--duration`      | Number of days to aggregate. Default: `7`                               |
| `--date-bin`      | Time granularity: `day` or `month`. Default: `day`                      |
| `--country`       | Filter by country code(s) (space-separated, e.g. `AU US`)               |
| `--device`        | Filter by device type: `desktop`, `mobile`, `tablet`                    |
| `--connection`    | Filter by connection type                                               |
| `--path`          | Filter by URL path(s) (space-separated)                                 |
| `--page-grouping` | Filter by page grouping UUID(s) (space-separated)                       |
| `--json`          | Output as JSON                                                          |

### Other RUM commands:

- `calibre rum history` - Display RUM historical trends over time
- `calibre rum pages` - Display page-level RUM metrics breakdown, sortable and paginated
- `calibre rum config` - Display the RUM configuration for a site

---

### `calibre crux` — Chrome User Experience Report

Field performance data sourced from real Chrome users (the Chrome User Experience Report). Provides origin-level and URL-level Core Web Vitals with historical trends.

- `calibre crux summary` - Display origin-level CrUX aggregate metrics and Core Web Vitals assessment for a site.
- `calibre crux history` - Display historical CrUX trends for a site with collection period data.
- `calibre crux urls` - List all CrUX-monitored URLs for a site
- `calibre crux url` - Display detailed CrUX data for a specific monitored URL, including metrics and history

---

## 🚩 Enhancements

### `calibre site list`

Now shows monitoring status for each site indicating which data sources are active:

- **Synthetic** — scheduled Lighthouse tests
- **CrUX** — Chrome User Experience Report data
- **RUM** — Real User Metrics collection

The table output includes a new "Monitoring" column. JSON output includes a `monitoringStatus` object with `synthetic`, `crux`, and `rum`, which are null or report monitoring status warnings.

### `calibre metric-list`

Now accepts a `--type` flag to filter metrics by data source:

```
calibre metric-list                    # Defaults to synthetic metrics
calibre metric-list --type=synthetic   # Synthetic metrics only
calibre metric-list --type=crux        # CrUX metrics only
calibre metric-list --type=rum         # RUM metrics only
```

As always, running `calibre --help` will show the full list of available commands and options. For more details on all commands, see [Calibre’s documentation](https://calibreapp.com/docs/automation/cli-commands).

---

## 🛠 Core

### Node.js API

New programmatic exports:

```javascript
import { Crux, Rum } from 'calibre'

// CrUX
const summary = await Crux.summary({ site: 'my-site', formFactor: 'PHONE' })
const history = await Crux.history({
  site: 'my-site',
  timePeriod: 'SIX_MONTHS'
})
const urls = await Crux.urls({ site: 'my-site' })
const urlDetail = await Crux.url({ site: 'my-site', uuid: '...' })

// RUM
const dashboard = await Rum.summary({
  site: 'my-site',
  metrics: ['lcp', 'cls', 'inp'],
  duration: 7
})
const rumHistory = await Rum.history({
  site: 'my-site',
  metrics: ['lcp', 'cls', 'inp'],
  duration: 30
})
const rumPages = await Rum.pages({
  site: 'my-site',
  metrics: ['lcp', 'cls', 'inp'],
  sortBy: 'lcp',
  limit: 50
})
const rumConfig = await Rum.config({ site: 'my-site' })
```

---

## 📖 Documentation

- Updated `examples/bash/` with examples for `crux`, `rum`, `deploy`, and `synthetic` commands.
- Updated `examples/nodejs/` with examples for CrUX and RUM programmatic API usage.

# 6.3.0 (2025-12-10)

## 🚩 Commands and flags

- Added support for host blocking to `calibre test create` command via new `--blockedHosts` flag. Supports wildcard patterns (e.g., `*.google-analytics.com`), comma-separated lists, JSON arrays, or file paths.
- Removed adblocking support from Single Page Tests, Test Profiles & Synthetic Test Results. Adblocking support was deprecated March 25' (https://calibreapp.com/changelog/archive/2025/03-host-blocking), and removed December 25'.
- Removed `--adblocker` flag from `calibre test create`, `calibre site create-test-profile`, and `calibre site update-test-profile` commands.

## 🛠 Core

- Updated Node.js example (`examples/nodejs/create-test.js`) to demonstrate `blockedHosts` usage with wildcard patterns.

## 🧹 Housekeeping

- Update dependencies in response to latest dependabot updates and security patches.

# 6.2.1 (2025-10-20)

## 🐛 Bug fixes

- Remove `--no-warnings` flag from CLI shebang to improve Node.js compatibility.

# 6.2.0 (2025-10-01)

## 🧹 Housekeeping

- Update minimum Node.js version to 20+.
- Update dependencies in response to latest dependabot updates and security patches.

# 6.1.0 (2025-03-20)

## 🐛 Bug fixes

- Fix plain text output for `calibre site metrics` command.

## 🧹 Housekeeping

- Update `calibre site create` internal query.
- Update & fix metric budget list example (`examples/nodejs/metric-budgets/list.js`).
- Remove `changeThreshold` field from Metric Budget API responses, which has been deprecated (Closes #792).
- Update dependencies in response to latest dependabot updates and security patches.

# 6.0.0 (2024-12-11)

## 🛠 Core

- Tests created with `calibre test create` or `Test.create` now expire after 1 year. Once expired, the test will be deleted. You can set a custom expiry date with the `--expiresAt` flag.
- Adds `--expiresAt` flag to `calibre test create`. You can use this flag to set an expiry date for the test. After the expiry date, the test will be automatically deleted.

## 🧹 Housekeeping

- Updates dependencies in response to latest dependabot updates and security patches.

# 5.2.0 (2024-08-29)

## 🛠 Core

- Removes usage of Calibre deprecated API fields that will be removed January 2025.
- Update package to require node 18.x or higher.

## 🧹 Housekeeping

- Update eslint to latest, fix linting issues.

# 5.1.3 (2024-02-21)

## 🐛 Bug fixes

- Fixes markdown output for `calibre site create-pull-request-review` (#671).

## 🧹 Housekeeping

- Updates dependencies in response to latest dependabot updates.

# 5.1.2 (2023-11-03)

## 🐛 Bug fixes

- Fixes markdown output for `calibre test create` (#634).

## 🧹 Housekeeping

- Updates dependencies in response to latest dependabot updates.

# 5.1.1 (2023-10-05)

## 🚩 Commands and flags

- Adds `--markdown` output flag to `calibre site pull-request-review` command.

## 🧹 Housekeeping

- Updates dependencies in response to latest dependabot updates.

# 5.1.0 (2023-08-19)

## 🚩 Commands and flags

- Adds new command: `calibre site create-pull-request-review` to compare a preview deployment for a Site already monitored by Calibre.
- Adds new command: `calibre site pull-request-reviews` to list Pull Request Reviews.
- Adds new command: `calibre site pull-request-review` to retrieve and display an existing Pull Request Review.
- Updates output of `calibre test show` and `calibre test create --waitForTest` to return a new Single Page Test report.
- Adds `--webhookUrl` and `--webhookSecret` flags to `calibre test create`. You can use these flags to POST the results of a Single Page Test to a desired URL with HMAC secret.
- Adds a new `--markdown` flag to `calibre test show` and `calibre test create`. You can use `--markdown` to generate a Single Page Test report.

## 🧹 Housekeeping

- Updates dependencies in response to latest security patches.
- Swapped dependency `update-notifier` for `simple-update-notifier`, which has better smaller and less risky package supply chain.
- Swapped dependency `json2csv` (now deprecated) for same authors new package that is maintained.

# 5.0.4 (2023-05-31)

## 🛠 Core

- Add Brotli decompression support for report JSON downloads

# 5.0.3 (2022-08-25)

## 🛠 Core

- Fixed Windows support

# 5.0.2 (2022-07-15)

## 🚩 Commands and flags

- Updates `calibre device-list` command to output additional emulated device details (screen width and height, device type: `phone` `tablet` or `desktop` and status: `current` or `discontinued`)

# 5.0.1 (2022-05-13)

## 🚩 Commands and flags

- Adds a new command: `calibre team list` to list all Teams depending on API Token in use.

## 🛠 Core

- Updates all command and flag descriptions for clarity and accuracy.

## 📖 Documentation

- updates `README.md` to include link to Calibre’s documentation page for all CLI commands

# 5.0.0 (2022-04-29)

## 💥 Breaking changes

- Ends support for [Node 12](https://nodejs.org/en/about/releases/) (end of life as of `2022-04-30`).
- Discontinues packaged binary builds: releases only via [npm](https://www.npmjs.com/package/calibre).

## 🚩 Commands and flags

- Adds a new flag for `calibre test create`: `--waitForTest` (default: `false`).

## 🛠 Core

- Adds a new package export: `cli-commands` (returns all command functions and CLI options).
- Adds a new package export: `cli-metadata` (returns all command documentation).
- Adds a new package script: `npm run generate-cli-md` (generates `CLI_COMMANDS.md` CLI documentation file).
- Now written in ES Modules.
- Adds build step for producing CommonJS entry points.
- Adds built-in throttling to requests made with the API so they don't hit the request limit.

## 🧹 Housekeeping

- Turns `ESLint` on for the build process.

## 📖 Documentation

- Updates `README.md` to reflect current usage.
- Updates all Node.js examples to ES Modules.
- Adds `CLI_COMMANDS.md` that showcases all available commands and subcommands with their options.

# 4.2.0 (2022-01-21)

## 🚩 Commands and flags

- Adds `Site.get` to get a given Site.
- Adds `Site.update` to update a given Site.

# 4.1.0 (2022-01-19)

## 🚩 Commands and flags

- Adds missing fields for TestProfile queries (`hasDeviceEmulation`, `hasBandwidthEmulation`, `isMobile`, `position`, `cookies`, `headers`, `blockedThirdParties`).
- Adds missing fields Deploy queries (`url`, `username`).
- Adds missing field for Location queries (`shortName`).
- Adds missing fields for MetricBudget queries (`status`, `changeThreshold`, `metric`).
- Adds missing fields for Page queries (`canonical`, `position`).

# 4.0.2 (2021-09-21)

## 🐛 Bugs

- Fixes `get-snapshot-metrics` CSV output (profile was not being set correctly).

# 4.0.1 (2021-08-25)

## 🐛 Bugs

- Fixes `profiles` parameter not being passed for `site metrics` (thanks @jonogillettt).

# 4.0.0 (2021-08-17)

## 💥 Breaking changes

- Replaces `site get-pulse-metrics` with `site metrics`.
- Adds `metric-list` which lists all available metrics, their category, advised ranges and recommendation for tracking.
- Ends support for Node 10.x.

# 3.3.0 (2021-08-04)

## 🚩 Commands and flags

- Adds `team` input to `calibre site create`.

# 3.2.2 (2021-04-16)

## 🛠 Core

- Updates Timeseries API: Return `page` for `series` data.

# 3.2.1 (2021-02-02)

## 🐛 Bugs

- Fixes Timeseries API: Filter by Profile.

## 🧹 Housekeeping

- Updates dependencies, inclusive of latest security patches.

# 3.2.0 (2020-10-07)

## 🐛 Bugs

- Fixes `site create-test-profile` to default JavaScript execution to on.
- Fixes `more information` link.

# 3.1.1 (2020-04-23)

## 🐛 Bugs

- Fixes reference to `token set` in error message.

## 🚩 Commands and flags

- Updates `get-pulse-metrics` description.

# 3.1.0 (2020-03-26)

## 🛠 Core

- Adds support for formatting `milliunit` measurements.

# 3.0.2 (2020-03-05)

## 🐛 Bugs

- Fixes parsing of `to` and `from` arguments in the `get-pulse-metrics` command.

# 3.0.1 (2020-03-04)

## 🛠 Core

- Allows use of token store for Node.

# 3.0.0 (2020-02-07)

## 🚩 Commands and flags

- Adds `calibre token set` command.
- Adds `calibre token remove` command.
- Adds ability to get Test Agent settings in `agentSettings` API.
- Adds `agentSettings` to create in `site` API.
- Adds `--schedule` flag to `create site` with Snapshot schedule.
- Adds `--interval` flag to `create site` with Snapshot schedule interval.
- Updates `create site` to have same defaults as web.

## 🛠 Core

- Updates default host to https://api.calibreapp.com.
- Improves error handling when trying to `get-snapshot-metrics` for a snapshot
  that does not exist.
- Supports Node version ≥ `10.13.0` (the first version of 10.x that was considered LTS).

## 🐛 Bugs

- Fixes undefined `ref` when creating a snapshot in API without a `ref`.

# 2.4.0 (2019-12-03)

## 🚩 Commands and flags

- Adds the ability to set `isPrivate` in `test` API.
- Adds `--private` flag to create a private test.

# 2.3.2 (2019-08-08)

## 🚩 Commands and flags

- Updates the TimeSeries api to return `uuid` and `canonical` for `pages` and `uuid`, `name`, `jsIsDisabled`, `adBlockIsEnabled`, `hasDeviceEmulation`, `hasBandwidthEmulation` and `isMobile` for `testProfiles`.

# 2.3.1 (2019-07-23)

## 🛠 Core

- Set default count in `deploys` API.

## 🐛 Bugs

- Fixes `destroy` mutation in `snapshot` API to pass `String` to GraphQL API.

# 2.3.0 (2019-07-15)

## 🚩 Commands and flags

- Adds ability to add custom headers in `test` API.
- Adds `--headers` flag to create test with custom headers.

# 2.2.1 (2019-07-06)

## 🧹 Housekeeping

- Updated `.npmignore` so that development data isn’t included in the package.

# 2.2.0 - 2019-07-05

## 🚩 Commands and flags

- Adds `integrations` to to API.
- Adds `metric-budgets` to to API.
- Adds `agent-settings` to to API.

# 2.1.0 (2019-06-12)

## 🛠 Core

- Changes `calibre site pages` to use paginated query method.

# 2.0.2 (2019-05-20)

## 🛠 Core

- Updates `api-error` util to get GraphQL errors from `extensions`.

# 2.0.1 (2019-05-17)

## 🐛 Bugs

- Fixes test output to only display metric if available.

# 2.0.0 (2019-04-30)

## 🚩 Commands and flags

- Adds `calibre site deploys` command.
- Adds `calibre site create-deploy` command.
- Adds `calibre site delete-deploy` command.
- Adds ability to turn adblocker on in `test` API.
- Adds ability to turn adblocker on or off in `test-profile` API.
- Adds `--adblocker` flag to create test with adblocker enabled.
- Adds `--no-adblocker` and `--adblocker` flags for turning adblocking on or off for a test profile.
- Changes `--disableJavascript` flag to `--no-javascript` to turn JS off for a test profile.
- Changes `--enableJavascript` flag to `--javascript` to turn JS on for a test profile.
- Changes `get-pulse-metrics` to use the `TimeSeries` query method.
- Changes `calibre site snapshots` to use paginated query method.
- Changes `test` API to return tests when they complete, error or timeout.
- Changes `calibre site create test` to show the error or timeout failure.

## 🛠 Core

- Updated formatting of Lighthouse scores for Single Page Tests.
- Changed the metrics chart for Single Page Tests to show First Contentful Paint instead of First Meaningful Paint.
- Removes GIF download from `download-snapshot-artifacts`.

# 1.2.4 (2019-03-18)

## 🐛 Bugs

- Fixes output of request result (format with `JSON`).

# 1.2.3 (2019-03-11)

## 🐛 Bugs

- Fixes Snapshot metrics CSV.

# 1.2.2 (2019-02-28)

## 🚩 Commands and flags

- Removes `--no-deprecation` flag.

# 1.2.1 (2019-02-21)

## 🚩 Commands and flags

- Removed `await-for-of` to continue support for Node 8.
- Changed `download-artifact` commands to output relative directory of stored
  artifacts.

# 1.2.0 (2019-02-19)

## 🚩 Commands and flags

- Adds `calibre test download-artifact <uuid>` command.
- Adds `calibre site download-snapshot-artifacts --site=<slug> <id>` command.
- Changes `calibre site delete-snapshot` to use `id` rather than `iid`.
- Changes `calibre site get-pulse-metrics` to default to returning data for all pages. (Previously the `--page` flag was required)
- Adds `calibre request --query=<graphql query>` command.

## 🛠 Core

- Changes internal queries to use `hasRecentlyCompletedSnapshots` rather than `hasCompletedSnapshots`.
- Updates Node API to use `GraphQL.request`.
- Adds a mock server and utilities for testing.

# 1.1.1 (2018-08-22)

## 🐛 Bugs

- Fixes `--csv` output (#26).

# 1.1.0 (2018-07-20)

## 🚩 Commands and flags

- Adds `calibre site delete-snapshot` command.

# 1.0.9 (2018-05-11)

## 🛠 Core

- Switches page objects to use `UUID` (rather than `slug`) to reflect other objects.

# 1.0.8 (2018-05-03)

## 🐛 Bugs

- Fixes path issue.

# 1.0.7 (2018-05-02)

## 🚩 Commands and flags

- Adds `calibre site create <name> [options]` command.
- Adds `calibre site delete` command.
- Adds `calibre site create-page` command.
- Adds `calibre site update-page` command.
- Adds `calibre site delete-page` command.
- Adds `calibre site create-test-profile` command.
- Adds `calibre site update-test-profile` command.
- Adds `calibre site delete-test-profile` command.
- Adds `--metrics` flag to `calibre site get-pulse-metrics` command. Specify the metrics you’d like returned.

## 🛠 Core

- Cleans up internal error handling.

## 📖 Documentation

- Adds Node.js example for creating a Site using the new `Site.create` method.
- Adds Node.js example that demonstrates how to create a Single Page Test from every Calibre testing location.

# 1.0.6 (2018-04-14)

## 🛠 Core

- The `calibre test create` command now accepts a `--cookie-jar` flag. It‘ll use a netscape formatted `cookie-jar` for a given test.
