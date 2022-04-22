![Calibre CLI - Automate your performance system](https://user-images.githubusercontent.com/924/54003204-7c294700-41a5-11e9-911e-c4d603fb619f.png)

[![NPM package](https://img.shields.io/npm/v/calibre.svg)](https://www.npmjs.com/package/calibre)

# Getting started

- [Installation](#installation)
- Get an API Token
- Using the Node.js API
- Using the Command line client

## Installation

To get the latest version, run this command:

```
npm install -g calibre
```

### Node version support

The `calibre` package is built to support for **all current Node.js LTS releases**.

## Node.js API

```
// ES Modules
import { Site } from 'calibre'
await Site.list()
```

or

```
// CommonJS
const { Site } = require('calibre')
await Site.list()
```

## Package exports

In addition to the named default exports shown above, the `calibre` package also exports CLI related metadata, which can be used to generate CLI documentation.

**CLI Commands**

Each CLI command is a Node module that exports `command`, `describe`, `handler` and `builder`. You can import all CLI commands from `calibre/cli-commands` (See `src/cli.js` for reference).

```
import Commands from 'calibre/cli-commands'
```

**CLI Metadata**

Command metadata (Used to generate CLI documentation) can be imported from the `calibre/cli-metadata` export.

```
import { getCommandMetaData } from 'calibre/cli-metadata'
console.log(JSON.stringify(getCommandMetaData(), null, 2))
```

## Features

- **Manage your performance system with a single command**: `calibre`.
- **Single page tests**. Create one-off, sharable Calibre tests for fast feedback: `calibre test create <url> --location=Frankfurt --device=iPhone6`
- **Deployments**. Track performance, best practices, accessibility and SEO between deploys
- **CI/CD/Automation**. Every command has a --json flag for machine readable output: `calibre test <url> --location=Sydney --json`
- **Scriptable**. All API methods are exported to the Calibre NPM package

## Authentication

Authentication is handled via an environment variable: `CALIBRE_API_TOKEN`. Create your token via the team API tokens page.

## Usage

```
$ calibre --help
```

## Examples

- [Bash examples](examples/bash)
- [Node.JS examples](examples/nodejs)
