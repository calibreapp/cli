
### calibre site create <name> [options]

Add a site for Calibre to monitor

Options:
 
  * `url`: The homepage URL of the site,
  * `location`: Calibre will monitor from this location,
  * `team`: The identifying slug of the team,
  * `schedule`: Schedule for automated snapshots. One of: hourly, daily, every_x_hours (default: `every_x_hours`),
  * `interval`: Automated snapshot interval. UTC hour of day for 'daily', hour interval for 'every_x_hours' (default: `6`),
  * `json`: Output in JSON format


### calibre site list

Print a list of sites being tracked by Calibre

Options:
 
  * `json`: Output in JSON format


### calibre site download-snapshot-artifacts [options]

Downloads the artifacts of a snapshot to ./snapshot-artifacts/<id>

Options:
 
  * `site`: The identifying slug of a site (string),
  * `id`: The id of the snapshot,
  * `json`: Output in JSON format


### calibre site get-snapshot-metrics [options]

Get the metrics of a given snapshot

Options:
 
  * `site`: The identifying slug of a site (string),
  * `snapshot`: The identifying id of a snapshot,
  * `json`: Output in JSON format,
  * `csv`: Output in CSV format


### calibre site metrics [options]

Get timeseries metrics for a given site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `pages`: A space separated list of page uuids to return metrics for (when not set, defaults to all pages). eg: --pages=4a82662c-67dc-40cd-a461-6afc904260f3 51b3cb71-e534-4d48-842a-d8c9da672f55 or use multiple --pages for each page (array),
  * `profiles`: A space separated list of profile uuids to return metrics for (when not set, defaults to all test profiles). eg: --profiles=4a82662c-67dc-40cd-a461-6afc904260f3 51b3cb71-e534-4d48-842a-d8c9da672f55 or use multiple --profiles for each profile (array),
  * `metrics`: A space separated list of metrics to return (when not set, defaults to all metrics). eg: --metrics=first-meaningful-paint first-interactive or use multiple --metrics flags for each metric (array),
  * `json`: Output in JSON format,
  * `csv`: Output in CSV format,
  * `from`: The start date to retrieve from in the format Year-Month-Day (when not set, defaults to 7 days ago),
  * `to`: The end date to retrieve to in the format Year-Month-Day (when not set, defaults to today),
  * `30-day`: Get the last 30 days of metrics (without this flag, the to and from values will be used)


### calibre site deploys [options]

Print a list of deploys

Options:
 
  * `site`: The identifying slug of a site (string),
  * `count`: The number of records to return, maximum: 500 (default: `25`),
  * `cursor`: The cursor to fetch records after,
  * `json`: Output in JSON format


### calibre site create-deploy [options]

Create a deploy

Options:
 
  * `site`: The identifying slug of a site (string),
  * `revision`: The source control revision id of the code you are deploying (e.g. git hash or tag name),
  * `repository`: The base URL of the repository containing the source code being deployed (e.g. https://github.com/calibreapp/app),
  * `username`: The name of the user who deployed the code,
  * `json`: Output in JSON format


### calibre site delete-deploy [options]

Deletes a deploy from a site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `uuid`: The uuid of the deploy,
  * `confirm`: Confirm the deletion,
  * `json`: Output in JSON format


### calibre site pages [options]

Print a list of pages for a given site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `count`: The number of records to return, maximum: 500 (default: `25`),
  * `cursor`: The cursor to fetch records after,
  * `json`: Output in JSON format


### calibre site create-page <name> [options]

Add a page to an existing site tracked by Calibre

Options:
 
  * `site`: The identifying slug of a site (string),
  * `url`: The name of the page,
  * `json`: Output in JSON format


### calibre site update-page [options]

Update the name and/or URL of a page

Options:
 
  * `uuid`: The UUID of the page,
  * `name`: The name of the page,
  * `url`: The URL of the page,
  * `site`: The identifying slug of a site (string),
  * `json`: Output in JSON format


### calibre site delete-page [options]

Deletes a page from a site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `uuid`: The UUID of the page,
  * `confirm`: Confirm the deletion,
  * `json`: Output in JSON format


### calibre site snapshots [options]

Print a list of snapshots

Options:
 
  * `site`: The identifying slug of a site (string),
  * `count`: The number of records to return, maximum: 500 (default: `25`),
  * `cursor`: The cursor to fetch records after,
  * `json`: Output in JSON format


### calibre site create-snapshot [options]

Create a snapshot

Options:
 
  * `site`: The identifying slug of a site (string),
  * `ref`: Sets a reference to the snapshot,
  * `json`: Output in JSON format


### calibre site delete-snapshot [options]

Deletes a snapshot from a site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `id`: The id of the snapshot,
  * `confirm`: Confirm the deletion,
  * `json`: Output in JSON format


### calibre site test-profiles [options]

Print a list of test profiles for a given site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `json`: Output in JSON format


### calibre site create-test-profile <name> [options]

Add a test profile to a site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `device`: Sets the emulated device that the profile will be run on,
  * `connection`: Sets the emulated connection speed this profile,
  * `javascript`: Turn JavaScript execution on/off (default: `true`) (boolean),
  * `adblocker`: Turn adblocking on/off (boolean),
  * `cookie-jar`: Uses a netscape formatted cookie jar file at this path,
  * `json`: Output in JSON format


### calibre site update-test-profile [options]

Update a test profile. Only updates attributes sent.

Options:
 
  * `uuid`: The UUID of the test profile,
  * `device`: Sets the emulated device that the profile will be run on,
  * `connection`: Sets the emulated connection speed this profile,
  * `site`: The identifying slug of a site (string),
  * `json`: Output in JSON format,
  * `javascript`: Turn JavaScript execution on/off (default: `true`) (boolean),
  * `adblocker`: Turn adblocking on/off (boolean),
  * `cookie-jar`: Uses a netscape formatted cookie jar file at this path


### calibre site delete-test-profile [options]

Deletes a test profile from a site

Options:
 
  * `site`: The identifying slug of a site (string),
  * `uuid`: The UUID of the test profile,
  * `confirm`: Confirm the deletion,
  * `json`: Output in JSON format


### calibre test create <url> [options]

Run a test against any public URL

Options:
 
  * `device`: Sets the emulated device that the test will be run on,
  * `location`: The test will be run on a machine in this location,
  * `connection`: Sets the emulated connection speed for this test,
  * `adblocker`: Turn adblocking on/off (boolean),
  * `private`: Private tests are only accessible by logged in team members (boolean),
  * `cookie-jar`: Uses a netscape formatted cookie jar file at this path,
  * `headers`: Stringify'd JSON HTTP Header key/value pairs or path to JSON file of HTTP Header key/value pairs ,
  * `json`: Output in JSON format,
  * `waitForTest`: Wait for test to complete before returning (boolean)


### calibre test download-artifacts <uuid>

Downloads the artifacts of a test to ./test-artifacts/<uuid>

Options:
 
  * `json`: Output in JSON format


### calibre test list

Print a list of previously run tests

Options:
 
  * `json`: Output in JSON format


### calibre test show <uuid>

Print the details of a given test

Options:
 
  * `json`: Output in JSON format


### calibre connection-list

Print a list of connection speeds

Options:
 
  * `json`: Print a list of connection speeds as JSON

### calibre device-list

Print a list of test devices

Options:
 
  * `json`: Print a list of test devices as JSON

### calibre location-list

Print a list of test locations

Options:
 
  * `json`: Print a list of test locations as JSON

### calibre metric-list

Print a list of metrics

Options:
 
  * `json`: Print a list of metrics as JSON

### calibre token set <key>

Set the Calibre API token used for CLI commands

Options:
 


### calibre token remove

Remove the Calibre API token used for CLI commands

Options:
 


### calibre request

Make a request to the Calibre GraphQL API

Options:
 
  * `query`: GraphQL query to execute. e.g.:

calibre request --query='query GetSite($slug: String!) {organisation{site(slug: $slug){slug}}}' --slug=calibre (string),
  * `variables`: Pass query variables as named arguments

