### 4.1.0 - 2022-01-19

- Add missing fields for TestProfile queries (hasDeviceEmulation, hasBandwidthEmulation, isMobile, position, cookies, headers, blockedThirdParties, position)
- Add missing fields Deploy queries (url, username)
- Add missing field for Location queries (shortName)
- Add missing fields for MetricBudget queries (status, changeThreshold, metric)
- Add missing fields for Page queries (canonical, position)

### 4.0.2 - 2021-09-21

- Fix get-snapshot-metrics CSV output (profile was not being set correctly)

### 4.0.1 - 2021-08-25

- Fix `profiles` parameter not being passed for `site metrics` (thanks @jonogillettt).

### 4.0.0 - 2021-08-17

**Breaking Changes**

- Replace `site get-pulse-metrics` with `site metrics`.
- Add `metric-list` which lists all available metrics, their category, advised ranges and recommendation for tracking.
- Drop support for Node 10.x.

### 3.3.0 - 2021-08-04

- Add `team` input to `calibre site create`.

### 3.2.2 - 2021-04-16

- Update Timeseries API: Return `page` for `series` data.

### 3.2.1 - 2021-02-02

- Fix Timeseries API: Filter by Profile.
- Updated dependencies, inclusive of latest security patches.

### 3.2.0 - 2020-10-07

- Fix `site create-test-profile` to default JavaScript execution to on.
- Fix more information link.

### 3.1.1 - 2020-04-23

- Fix reference to `token set` in error message.
- Update `get-pulse-metrics` description.

### 3.1.0 - 2020-03-26

- Add support for formatting `milliunit` measurements.

### 3.0.2 - 2020-03-05

- Fix parsing of `to` and `from` arguments in CLI `get-pulse-metrics` command.

### 3.0.1 - 2020-03-04

- Allow use of token store for Node.

### 3.0.0 - 2020-02-07

- Added `calibre token set` command.
- Added `calibre token remove` command.
- Updated default host to https://api.calibreapp.com.
- Added ability to get agent settings in `agentSettings` API.
- Added `agentSettings` to create in `site` API.
- Added `--schedule` flag to `create site` with Snapshot schedule.
- Added `--interval` flag to `create site` with Snapshot schedule interval.
- Updated `create site` to have same defaults as web.
- Improved error handling when trying to `get-snapshot-metrics` for a snapshot
  that does not exist.
- Fix undefined `ref` when creating a snapshot in API without a `ref`.
- Support node version >= 10.13.0 (the first version of 10.x that was considered LTS.).

### 2.4.0 - 2019-12-03

- Added ability to set `isPrivate` in `test` API.
- Added `--private` flag to create a private test.

### 2.3.2 - 2019-08-08

- Update the TimeSeries api to return `uuid` and `canonical` for `pages` and `uuid`, `name`, `jsIsDisabled`, `adBlockIsEnabled`, `hasDeviceEmulation`, `hasBandwidthEmulation` and `isMobile` for `testProfiles`.

### 2.3.1 - 2019-07-23

- Set default count in `deploys` API.
- Fix `destroy` mutation in `snapshot` API to pass `String` to GraphQL API.

### 2.3.0 - 2019-07-15

- Added ability to add custom headers in `test` API.
- Added `--headers` flag to create test with custom headers.

### 2.2.1 - 2019-07-06

- Updated .npmignore so that development data isn't included in the package.

### 2.2.0 - 2019-07-05

- Added `integrations` to to API.
- Added `metric-budgets` to to API.
- Added `agent-settings` to to API.

### 2.1.0 - 2019-06-12

- Changed `calibre site pages` to use paginated query method.

### 2.0.2 - 2019-05-20

- Updated `api-error` util to get GraphQL errors from `extensions`.

### 2.0.1 - 2019-05-17

- Fixed test output to only display metric if available.

### 2.0.0 - 2019-04-30

- Added `calibre site deploys` command.
- Added `calibre site create-deploy` command.
- Added `calibre site delete-deploy` command.
- Added ability to turn adblocker on in `test` API.
- Added ability to turn adblocker on or off in `test-profile` API.
- Added `--adblocker` flag to create test with adblocker enabled.
- Added `--no-adblocker` and `--adblocker` flags for turning adblocking on or off for a test profile.
- Changed `--disableJavascript` flag to `--no-javascript` to turn JS off for a test profile.
- Changed `--enableJavascript` flag to `--javascript` to turn JS on for a test profile.
- Removed GIF download from `download-snapshot-artifacts`.
- Changed `get-pulse-metrics` to use the `TimeSeries` query method.
- Changed `calibre site snapshots` to use paginated query method.
- Changed `test` API to return tests when they complete, error or timeout.
- Changed `calibre site create test` to show the error or timeout failure.
- Updated formatting of Lighthouse scores for single page tests.
- Changed the metrics chart for single page tests to show First Contentful Paint instead of First Meaningful Paint.

### 1.2.4 - 2019-03-18

- Fixed output of request result (format with JSON).

### 1.2.3 - 2019-03-11

- Fixed Snapshot metrics CSV.

### 1.2.2 - 2019-02-28

- Removed `--no-deprecation` flag.

### 1.2.1 - 2019-02-21

- Removed `await-for-of` to continue support for Node 8.
- Changed `download-artifact` commands to output relative directory of stored
  artifacts.

### 1.2.1 - 2019-02-21

- Removed `await-for-of` to continue support for Node 8.
- Changed `download-artifact` commands to output relative directory of stored
  artifacts.

### 1.2.0 - 2019-02-19

- Added `calibre test download-artifact <uuid>` command.
- Added `calibre site download-snapshot-artifacts --site=<slug> <id>` command.
- Changed `calibre site delete-snapshot` to use `id` rather than `iid`.
- Changed `calibre site get-pulse-metrics` to default to returning data for all pages. (Previously the `--page` flag was required)
- Changed internal queries to use `hasRecentlyCompletedSnapshots` rather than `hasCompletedSnapshots`.
- Added `calibre request --query=<graphql query>` command.
- Updated node API to use `GraphQL.request`.
- Added mock server and utilities for testing.

### 1.1.1 - 2018-08-22

- Fixed `--csv` output (#26).

### 1.1.0 - 2018-07-20

- Added `calibre site delete-snapshot` command.

### 1.0.9 - 2018-05-11

- Switched page objects to use UUID (rather than slug) to reflect other objects. (Retrospectively, this should have been a 1.1.0 release).

### 1.0.8 - 2018-05-03

- Fixed path issue.

### 1.0.7 - 2018-05-02

- Added `calibre site create <name> [options]` command.
- Added `calibre site delete` command.
- Added `calibre site create-page` command.
- Added `calibre site update-page` command.
- Added `calibre site delete-page` command.
- Added `calibre site create-test-profile` command.
- Added `calibre site update-test-profile` command.
- Added `calibre site delete-test-profile` command.
- Added `--metrics` flag to `calibre site get-pulse-metrics` command. Specify the metrics you’d like returned.
- Added Node.js example for creating a site using the new Site.create method.
- Added Node.js example that demonstrates how to create a single page test from every Calibre testing location.
- Cleaned up internal error handling.

### 1.0.6 - 2018-04-14

- The `calibre test create` command now accepts a --cookie-jar flag. It‘ll use a netscape formatted cookie-jar for a given test.
