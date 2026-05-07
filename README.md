# Calibre’s Node.js API and Command Line Client (CLI)

[![NPM package](https://img.shields.io/npm/v/calibre?color=informational)](https://www.npmjs.com/package/calibre)
![Node version support](https://img.shields.io/node/v/calibre?color=informational)
[![License](https://img.shields.io/github/license/calibreapp/cli?color=informational)](https://github.com/calibreapp/cli/blob/main/LICENSE)

This repository contains [Calibre’s](https://calibreapp.com/) APIs you can use to fetch and manage your monitoring data. The Command Line Client (CLI) is designed for simple tasks right from your terminal. We recommend using the Node.js API for more complex tasks and automation.

> ℹ️ **Please note:** Using the APIs requires an active Calibre account (in trial or on a paid plan).

## 🖇 Table of Contents

1. [Installation](#-installation)
2. [Authentication](#-authentication)
3. [Features](#-features)
4. [Usage](#-usage)
5. [Package Exports](#-package-exports)
6. [Script Examples](#-script-examples)
7. [Contributing](#-contributing)
8. [Resources](#-resources)
9. [License](#-license)

## 📥 Installation

To install the latest version globally, run this command:

```bash
npm install -g calibre
```

or save it directly to your project:

```bash
npm install calibre --save
```

The `calibre` package is built to support **all current Node.js LTS releases**.

## 🔐 Authentication

To authenticate to Calibre and use the APIs, **you will need to create or use an existing API Token**. Learn about the [types of API Tokens and how to create them here](https://calibreapp.com/docs/account-and-billing/manage-api-tokens).

Once you have an API Token, you can [store it locally](https://calibreapp.com/docs/automation/tokens#store-a-token-locally):

```bash
calibre token set <your token>
```

Or alternately, set [`CALIBRE_API_TOKEN` environment variable](https://calibreapp.com/docs/automation/tokens#store-a-token-as-an-environment-variable).

## 💡 Features

- **Three data sources**. Synthetic (Lighthouse testing), Chrome UX Report (CrUX), and Real User Metrics (RUM).
- **Manage performance with a single command**. Retrieve all speed data and manage your Synthetic testing settings.
- **Run [Single Page Tests](https://calibreapp.com/docs/automation/single-page-tests)**. Create one-off tests privately or share them with your team.
- **Monitor speed across deploys**. Track performance between deploys and mark them on your charts.
- **Real User Metrics**. View live visitor data, page-level breakdowns, and historical trends.
- **Chrome UX Report data**. Access origin-level and URL-specific CrUX data directly from the CLI.
- **Use Calibre within CI/CD**. Every command has a `--json` flag for machine-readable output.
- **Script any action**. We export all API methods to the Calibre `npm` package.

## 🛠 Usage

To see a full list of available commands, subcommands and options run:

```bash
$ calibre --help
$ calibre <command> --help
```

You can start using the CLI right away with the commands listed above, or start with:

```bash
# List all your sites
$ calibre site list

# Get a summary of your RUM data for a site
$ calibre rum summary --site my-site

# List pages or page groupings for a site
$ calibre rum pages --site my-site

# Get a summary of your CrUX data for a site
$ calibre crux summary --site my-site

# Manage your Synthetic testing settings for a site using synthetic sub-commands
$ calibre synthetic
```

or [see all commands](CLI_COMMANDS.md) in this repository or [Calibre’s documentation](https://calibreapp.com/docs/automation/cli-commands).

In Node, you can use the either ES Modules or CommonJS versions accordingly:

```javascript
// ES Modules
import { Site, Crux, Rum } from 'calibre'
await Site.list()
await Crux.summary({ site: 'my-site' })
await Rum.summary({ site: 'my-site' })
```

```javascript
// CommonJS
const { Site } = require('calibre')
await Site.list()
```

## 📤 Package exports

In addition to the named default exports shown above, the `calibre` package also exports CLI related metadata, which is used to generate CLI documentation.

### CLI Commands

Each CLI command is a Node module that exports `command`, `describe`, `handler` and `builder`. You can import all CLI commands from `calibre/cli-commands` (see [`src/cli.js`](https://github.com/calibreapp/cli/blob/main/src/cli.js) for reference).

```javascript
import Commands from 'calibre/cli-commands'
```

### CLI Metadata

You can import command metadata (used to generate CLI documentation) from the `calibre/cli-metadata` export:

```javascript
import { getCommandMetaData } from 'calibre/cli-metadata'
console.log(JSON.stringify(getCommandMetaData(), null, 2))
```

## 🙌🏻 Contributing

Happy to hear you’re interested in contributing to Calibre’s APIs! Please find our contribution guidelines [here](CONTRIBUTING.md).

## 🖥 Script Examples

We prepared a handful of examples for common actions you might want to perform:

- [Node.js examples](examples/nodejs)
- [Bash examples](examples/bash)

## 📚 Resources

Find code examples and more information for the [CLI](https://calibreapp.com/docs/automation/cli) and [Node.js API](https://calibreapp.com/docs/automation/node) in our documentation.

## 💼 License

This project is [MIT licensed](LICENSE).
