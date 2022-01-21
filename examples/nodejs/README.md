## Requirements to run these examples

- Node 12.22+
- Install the dependencies by running `npm install` from within the `examples/nodejs` directory.
- [A Calibre API token](https://calibreapp.com/docs/api/tokens)

Each example can be run by executing it as a script, eg: `CALIBRE_API_TOKEN=YOUR_TOKEN_HERE examples/nodejs/create-test.js`.

### Available examples

- **[create-test.js](create-test.js)** - Creates a one-off test for a given URL
- **[list-agent-locations.js](list-agent-locations.js)** - Prints a list of Calibre’s test locations
- **[world.js](world.js)** - Create a one-off test for a given URL from every Calibre test location
- **[bulk-page-import.js](bulk-page-import.js)** - Adds pages to a pre-existing site from an array.
- **[get-all-pulse-metrics.js](get-all-pulse-metrics.js)** - Iterates through every site and page in an account, returns the last 7 days of 'consistently-interactive' metrics for each.
- **[graphql-request](graphql-request.js)** - Make a request to the Calibre GraphQL API
- **[sites](sites)**
  - **[create.js](sites/create.js)** - Creates a site
  - **[delete.js](sites/delete.js)** - Deletes a given site
  - **[list.js](sites/list.js)** - Lists all sites
  - **[get.js](sites/get.js)** - Get a given site
  - **[update](sites/update.js)** - Updates the name for a given site
  - **[update](sites/update-headers-cookies.js)** - Updates the headers and cookies for a given site
  - **[update](sites/update-authentication-settings.js)** - Updates the authentication settings for a given site
- **[deploys](deploys)**
  - **[create.js](deploys/create.js)** - Creates a deploy for a given site
  - **[delete.js](deploys/delete.js)** - Deletes a given deploy for a given site
  - **[list.js](deploys/list.js)** - Lists deploys for a given site
- **[snapshots](snapshots)**
  - **[create.js](snapshots/create.js)** - Creates an snapshot for a given site
  - **[delete.js](snapshots/delete.js)** - Deletes a given snapshot for a given site
  - **[list.js](snapshots/list.js)** - Lists snapshots for a given site
- **[integrations](integrations)**
  - **[create.js](integrations/create.js)** - Creates an integration for a given site
  - **[delete.js](integrations/delete.js)** - Deletes a given integration for a given site
  - **[update.js](integrations/update.js)** - Updates a given integration for a given site
  - **[list.js](integrations/list.js)** - Lists integrations for a given site
- **[metric-budgets](metric-budgets)**
  - **[create.js](metric-budgets/create.js)** - Creates a metric budget for a given site
  - **[delete.js](metric-budgets/delete.js)** - Deletes a given metric budget for a given site
  - **[update.js](metric-budgets/update.js)** - Updates a given metric budget for a given site
  - **[list.js](metric-budgets/list.js)** - Lists metric budgets for a given site
- **[agent-settings](agent-settings)**
  - **[get](agent-settings/get.js)** - Get the agent settings for a given site
  - **[update](agent-settings/update.js)** - Updates the agent settings for a given site

### Writing your own, or looking for help?

To check what API functionality is available, check index.js at the root of this repository. If you spot something note quite right, or have a question, please log a [new issue](https://github.com/calibreapp/cli/issues) or contact Calibre support.
If you’ve built or adapated an example for your usecase, be sure to share it in a [new issue](https://github.com/calibreapp/cli/issues) ✌️
