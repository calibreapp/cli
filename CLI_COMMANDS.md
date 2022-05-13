
### calibre site create <name> [options]

Add a site for Calibre to monitor

Flags:
 
  * `--url`: The homepage URL of the site,
  * `--location`: Calibre will monitor from this location,
  * `--team`: The identifying slug of the team,
  * `--schedule`: Schedule for automated snapshots. One of: hourly, daily, every_x_hours (default: `every_x_hours`),
  * `--interval`: Automated snapshot interval. UTC hour of day for 'daily', hour interval for 'every_x_hours' (default: `6`),
  * `--json`: Outputs the results of the command in JSON format.


### calibre site list

Print a list of sites being tracked by Calibre

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre site download-snapshot-artifacts [options]

Downloads the artifacts of a snapshot to ./snapshot-artifacts/<id>

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--id`: The id of the snapshot,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site get-snapshot-metrics [options]

Get the metrics of a given snapshot

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--snapshot`: The identifying id of a snapshot,
  * `--json`: Outputs the results of the command in JSON format.,
  * `--csv`: Outputs the results of the command in CSV format.


### calibre site metrics [options]

Get timeseries metrics for a given site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--pages`: A list of Page UUIDs to return metrics for. You can separate multiple Pages by a space or use multiple --pages flags. (array),
  * `--profiles`: A list of Test Profile UUIDs to return metrics for. You can separate multiple Test Profiles by a space or use multiple --profiles flags. (array),
  * `--metrics`: A list of metric UUIDs to return metrics for. You can separate multiple metrics by a space or use multiple --metrics flags. (array),
  * `--json`: Outputs the results of the command in JSON format.,
  * `--csv`: Outputs the results of the command in CSV format.,
  * `--from`: The start date to retrieve data from in the Year-Month-Day format (default: 7 days ago).,
  * `--to`: The end date to retrieve data from in the Year-Month-Day format (default: today).,
  * `--30-day`: Get the last 30 days of metrics (without this flag, the to and from values will be used)


### calibre site deploys [options]

Print a list of deploys

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--count`: The number of items to return (default: 25, maximum: 500). (default: `25`),
  * `--cursor`: The cursor to fetch records after,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-deploy [options]

Create a deploy

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--revision`: The source control revision id of the code you are deploying (e.g. git hash or tag name),
  * `--repository`: The base URL of the repository containing the source code being deployed (e.g. https://github.com/calibreapp/app),
  * `--username`: The name of the user who deployed the code,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site delete-deploy [options]

Deletes a deploy from a site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--uuid`: The uuid of the deploy,
  * `--confirm`: Confirm the deletion,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site pages [options]

Print a list of pages for a given site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--count`: The number of items to return (default: 25, maximum: 500). (default: `25`),
  * `--cursor`: The cursor to fetch records after,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-page <name> [options]

Add a page to an existing site tracked by Calibre

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--url`: The name of the page,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site update-page [options]

Update the name and/or URL of a page

Flags:
 
  * `--uuid`: The UUID of the page,
  * `--name`: The name of the page,
  * `--url`: The URL of the page,
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.


### calibre site delete-page [options]

Deletes a page from a site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--uuid`: The UUID of the page,
  * `--confirm`: Confirm the deletion,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site snapshots [options]

Print a list of snapshots

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--count`: The number of items to return (default: 25, maximum: 500). (default: `25`),
  * `--cursor`: The cursor to fetch records after,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-snapshot [options]

Create a snapshot

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--ref`: Sets a reference to the snapshot,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site delete-snapshot [options]

Deletes a snapshot from a site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--id`: The id of the snapshot,
  * `--confirm`: Confirm the deletion,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site test-profiles [options]

Print a list of test profiles for a given site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-test-profile <name> [options]

Add a test profile to a site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--device`: Sets the emulated device that the profile will be run on,
  * `--connection`: Sets the emulated connection speed this profile,
  * `--javascript`: Turn JavaScript execution on/off (default: `true`) (boolean),
  * `--adblocker`: Turn adblocking on/off (boolean),
  * `--cookie-jar`: Uses a netscape formatted cookie jar file at this path,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site update-test-profile [options]

Update a test profile. Only updates attributes sent.

Flags:
 
  * `--uuid`: The UUID of the test profile,
  * `--device`: Sets the emulated device that the profile will be run on,
  * `--connection`: Sets the emulated connection speed this profile,
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.,
  * `--javascript`: Turn JavaScript execution on/off (default: `true`) (boolean),
  * `--adblocker`: Turn adblocking on/off (boolean),
  * `--cookie-jar`: Uses a netscape formatted cookie jar file at this path


### calibre site delete-test-profile [options]

Deletes a test profile from a site

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--uuid`: The UUID of the test profile,
  * `--confirm`: Confirm the deletion,
  * `--json`: Outputs the results of the command in JSON format.


### calibre test create <url> [options]

Run a test against any public URL

Flags:
 
  * `--device`: Sets the emulated device that the test will be run on,
  * `--location`: The test will be run on a machine in this location,
  * `--connection`: Sets the emulated connection speed for this test,
  * `--adblocker`: Turn adblocking on/off (boolean),
  * `--private`: Private tests are only accessible by logged in team members (boolean),
  * `--cookie-jar`: Uses a netscape formatted cookie jar file at this path,
  * `--headers`: Stringify'd JSON HTTP Header key/value pairs or path to JSON file of HTTP Header key/value pairs ,
  * `--json`: Outputs the results of the command in JSON format.,
  * `--waitForTest`: Wait for test to complete before returning (boolean)


### calibre test download-artifacts <uuid>

Downloads the artifacts of a test to ./test-artifacts/<uuid>

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre test list

Print a list of previously run tests

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre test show <uuid>

Print the details of a given test

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre connection-list

List all available network connection speeds.

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.

### calibre device-list

List all available test devices.

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.

### calibre location-list

List all available test locations.

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.

### calibre metric-list

List all available web performance metrics.

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.

### calibre token set <token>

Store your API Token to use the CLI (saved in ~/.config/configstore/calibre.json).




### calibre token remove

Remove the saved API Token used for CLI commands (from ~/.config/configstore/calibre.json).




### calibre request

Use the request command to make a request to the Calibre GraphQL API.

Flags:
 
  * `--query`: Pass a GraphQL query to execute. (string),
  * `--variables`: Pass query variables as named arguments.

