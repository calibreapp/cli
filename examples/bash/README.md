## Requirements to run these examples

* Bash shell
* [CLI, installed](https://calibreapp.com/docs/api/cli) and available on your path
* [A Calibre API token](https://calibreapp.com/docs/api/tokens) set as an environment variable (`CALIBRE_API_TOKEN`)
* [JQ](https://stedolan.github.io/jq/), available on your path (JSON query utility)

Each example is an executable script, eg: `./examples/bash/create-test.sh`.

### Available examples

- **[create-test.sh](create-test.sh)** - Creates a one-off test for a given URL
- **[get-agent-ip-address.sh](get-agent-ip-address.sh)** - Gets the IP address of a Calibre test agent
- **[crux-summary.sh](crux-summary.sh)** - Fetches Chrome UX Report summary and Core Web Vitals assessment
- **[rum-pages.sh](rum-pages.sh)** - Fetches RUM page-level breakdown
- **[deploy-create.sh](deploy-create.sh)** - Creates a deploy marker from current git revision

If you spot something note quite right, or have a question, please log a [new issue](https://github.com/calibreapp/cli/issues) or contact Calibre support.
If you’ve built or adapated an example for your usecase, be sure to share it in a [new issue](https://github.com/calibreapp/cli/issues) ✌️
