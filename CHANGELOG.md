# 6.0.0 (2023-08-01)

## 🚩 Commands and flags

- Adds a new command: `calibre site create-pull-request-review` to compare a preview deployment for a Site already monitored by Calibre.

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
