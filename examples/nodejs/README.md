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
- **[create-deploy.js](create-deploy.js)** - Creates a deploy for a given site
- **[create-snapshot.js](create-snapshot.js)** - Creates a snapshot for a given site
- **[integrations](integrations)**
  - **[create.js](integrations/create.js)** - Creates an integration for a given site
  - **[delete.js](integrations/delete.js)** - Deletes a given integration for a given site
  - **[update.js](integrations/update.js)** - Updates a given integration for a given site
  - **[list.js](integrations/update.js)** - Lists integrations for a given site

### Writing your own, or looking for help?

To check what API functionality is available, check index.js at the root of this repository. If you spot something note quite right, or have a question, please log a [new issue](https://github.com/calibreapp/cli/issues) or contact Calibre support.
If you’ve built or adapated an example for your usecase, be sure to share it in a [new issue](https://github.com/calibreapp/cli/issues) ✌️
