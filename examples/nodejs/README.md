## Requirements to run these examples

- Node 8.3+
- Install the dependencies by running `npm install` from within the `examples/nodejs` directory.
- [A Calibre API token](https://calibreapp.com/docs/api/tokens)

Each example can be run by executing it as a script, eg: `CALIBRE_API_TOKEN=YOUR_TOKEN_HERE examples/nodejs/create-test.js`.

### Available examples

- **[create-test.js](create-test.js)** - Creates a one-off test for a given URL
- **[list-agent-locations.js](list-agent-locations.js)** - Prints a list of Calibre’s test locations
- **[world.js](world.js)** - Create a one-off test for a given URL from every Calibre test location
- **[create-site.js](create-site.js)** - Add a site to be tracked by Calibre. Includes configuration of mobile emulation, cookies, and a number of pages
- **[get-all-pulse-metrics.js](get-all-pulse-metrics.js)** - Iterates through every site and page in an account, returns the last 7 days of 'consistently-interactive' metrics for each.
- **[graphql-request](graphql-request.js)** - Make a request to the Calibre GraphQL API

### Writing your own, or looking for help?

To check what API functionality is available, check index.js at the root of this repository. If you spot something note quite right, or have a question, please log a [new issue](https://github.com/calibreapp/cli/issues) or contact Calibre support.
If you’ve built or adapated an example for your usecase, be sure to share it in a [new issue](https://github.com/calibreapp/cli/issues) ✌️
