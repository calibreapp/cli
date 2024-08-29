
### calibre site create <name> [options]

Add a Site for Calibre to monitor.

Flags:
 
  * `--url`: The URL of the Site.,
  * `--location`: Choose the location for the test.,
  * `--team`: The identifying slug of the Team.,
  * `--schedule`: Set the schedule for automated Snapshots. Available options: hourly, daily, every_x_hours. (default: `every_x_hours`),
  * `--interval`: Set the Snapshot interval. Provide UTC hour (between 0 and 23) for daily Snapshots and numeric hour interval for every_x_hours option (between 1 and 168 hours). (default: `6`),
  * `--json`: Outputs the results of the command in JSON format.


### calibre site list

List all Sites you are tracking in Calibre.

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre site download-snapshot-artifacts [options]

Download the artifacts of a Snapshot to ./snapshot-artifacts/<id>. Includes: lighthouse.json, render progress screenshots, render progress MP4 video, HAR file (request log) and all other metrics and data available through the Calibre interface.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--id`: The id of the Snapshot.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site get-snapshot-metrics [options]

Get all metrics of a given Snapshot.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--snapshot`: The id of a Snapshot.,
  * `--json`: Outputs the results of the command in JSON format.,
  * `--csv`: Outputs the results of the command in CSV format.


### calibre site metrics [options]

Get time-series metrics for a selected Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--pages`: A list of Page UUIDs to return metrics for. You can separate multiple Pages by a space or use multiple --pages flags. (array),
  * `--profiles`: A list of Test Profile UUIDs to return metrics for. You can separate multiple Test Profiles by a space or use multiple --profiles flags. (array),
  * `--metrics`: A list of metric UUIDs to return metrics for. You can separate multiple metrics by a space or use multiple --metrics flags. (array),
  * `--json`: Outputs the results of the command in JSON format.,
  * `--csv`: Outputs the results of the command in CSV format.,
  * `--from`: The start date to retrieve data from in the Year-Month-Day format (default: 7 days ago).,
  * `--to`: The end date to retrieve data from in the Year-Month-Day format (default: today).,
  * `--30-day`: Get the last 30 days of metrics. Without this flag, CLI will use the to and from values.


### calibre site deploys [options]

List all deployments for a Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--count`: The number of items to return (default: 25, maximum: 500). (default: `25`),
  * `--cursor`: The cursor to fetch records after,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-deploy [options]

Create a deployment.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--revision`: The source control revision id of the code you are deploying. It could be a git hash or a tag name.,
  * `--repository`: The base URL of the repository containing the source code being deployed (e.g. https://github.com/calibreapp/app).,
  * `--username`: The username of who deployed the code.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site delete-deploy [options]

Delete a deploy from a selected Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--uuid`: The UUID of the deploy.,
  * `--confirm`: Use this flag to confirm the deletion of the selected deploy.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site pages [options]

List Pages for a selected Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--count`: The number of items to return (default: 25, maximum: 500). (default: `25`),
  * `--cursor`: The cursor to fetch records after,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-page <name> [options]

Add a Page to an existing Site tracked by Calibre.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--url`: The URL of the Page.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site update-page [options]

Update the name or URL of a Page.

Flags:
 
  * `--uuid`: The UUID of the Page.,
  * `--name`: Update the name of the Page.,
  * `--url`: Update the URL of the Page.,
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.


### calibre site delete-page [options]

Delete a Page from a selected Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--uuid`: The UUID of the Page.,
  * `--confirm`: Use this flag to confirm the deletion of the selected Page.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site snapshots [options]

List selected Snapshots for a Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--count`: The number of items to return (default: 25, maximum: 500). (default: `25`),
  * `--cursor`: The cursor to fetch records after,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-snapshot [options]

Create a Snapshot.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--ref`: Set a reference to the Snapshot.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site delete-snapshot [options]

Delete a Snapshot from a selected Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--id`: The id of the Snapshot.,
  * `--confirm`: Use this flag to confirm the deletion of the selected Snapshot.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site test-profiles [options]

List all Test Profiles for a Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-test-profile <name> [options]

Add a Test Profile to a Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--device`: Choose the emulated test device. (default: `Desktop`),
  * `--connection`: Choose the emulated network connection speed.,
  * `--javascript`: Turn JavaScript execution on or off. (default: `true`) (boolean),
  * `--adblocker`: Turn adblocking on or off. (boolean),
  * `--cookie-jar`: Set cookies by specifying a path to a Netscape formatted cookie jar file.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site update-test-profile [options]

Update Test Profile settings. Only changes specified attributes.

Flags:
 
  * `--uuid`: The UUID of the Test Profile.,
  * `--device`: Set the emulated device.,
  * `--connection`: Set the emulated network connection speed.,
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.,
  * `--javascript`: Turn JavaScript execution on or off (default: `true`) (boolean),
  * `--adblocker`: Turn adblocking on or off. (boolean),
  * `--cookie-jar`: Set cookies by specifying a path to a Netscape formatted cookie jar file.


### calibre site delete-test-profile [options]

Delete a Test Profile from a Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--uuid`: The UUID of the Test Profile.,
  * `--confirm`: Use this flag to confirm the deletion of the selected Test Profile.,
  * `--json`: Outputs the results of the command in JSON format.


### calibre site create-pull-request-review [options]

Create a Pull Request Review of a preview deployment.

Flags:
 
  * `--title`: e.g. "My Pull Request",
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--url`: The base URL of the preview deployment (e.g.: https://my-pull-request-123.example.com).,
  * `--branch`: The branch of the preview deployment. e.g.: "my-pull-request-123".,
  * `--sha`: The source control revision of the deployed code. e.g.: 9c72279.,
  * `--configPath`: Path to a Calibre YAML config file.,
  * `--waitForResult`: Wait for pull request to be evaluated before returning. (boolean),
  * `--failOnUnmetBudget`: Return a command failure if any existing budget is exceeded. (Requires --waitForResult to be set.) (boolean),
  * `--json`: Outputs the results of the command in JSON format.,
  * `--markdown`: Outputs the results of the command in Markdown format.


### calibre site pull-request-reviews [options]

List Pull Request Reviews for a selected Site.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.


### calibre site pull-request-review <branch>

See the results of a Pull Request Review.

Flags:
 
  * `--site`: A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command. (string),
  * `--json`: Outputs the results of the command in JSON format.,
  * `--markdown`: Outputs the results of the command in Markdown format.


### calibre team list

List Teams based on API Token access. For Admin Tokens, this will list all teams or as specified based on your settings. For Personal Access Tokens, this will list Teams that you have access to.

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre test create <url> [options]

Run a Single Page Test against any public URL.

Flags:
 
  * `--device`: Choose the emulated test device.,
  * `--location`: Choose the location for the test.,
  * `--connection`: Choose the emulated network connection speed.,
  * `--webhookUrl`: Test result JSON will be sent to this URL using HTTP POST.,
  * `--webhookSecret`: Secret used to sign the webhook payload. Secret can be validated using `Calibre-HMAC-SHA256-Signature` HTTP header. See https://calibreapp.com/docs/integrations/webhooks#webhook-security-and-verification for more information.,
  * `--adblocker`: Turn adblocking on or off. (boolean),
  * `--private`: Make the results of a test private (only accessible by members of your Calibre organisation). (boolean),
  * `--cookie-jar`: Set cookies by specifying a path to a Netscape formatted cookie jar file.,
  * `--headers`: Set HTTP headers by providing a path to a JSON file or a valid JSON key-value pairs.,
  * `--json`: Outputs the results of the command in JSON format.,
  * `--markdown`: Outputs the results of the command in Markdown format.,
  * `--waitForTest`: Wait for the test to complete before showing the results (default: test result link is shown immediately). (boolean)


### calibre test download-artifacts <uuid>

Download the artifacts of a test to ./test-artifacts/<uuid>. Includes: lighthouse.json, render progress screenshots, render progress MP4 video, HAR file (request log) and all other metrics and data available through the Calibre interface.

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre test list

List all previously run Single Page Tests (includes UUID, URL, device, connection, test location and status).

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.


### calibre test show <uuid>

See the results of a Single Page Test (also as outputted by the test create command).

Flags:
 
  * `--json`: Outputs the results of the command in JSON format.,
  * `--markdown`: Outputs the results of the command in Markdown format.


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
  * `--variables`: Pass query variables as named arguments. e.g.: `calibre request --query "$(cat query.gql)" --foo="example" --bar="example"`

