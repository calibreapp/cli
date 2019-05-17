![Calibre CLI - Automate your performance system](https://user-images.githubusercontent.com/924/54003204-7c294700-41a5-11e9-911e-c4d603fb619f.png)

[![Build status](https://badge.buildkite.com/5e41ea8c42fa868fc2c41c063e742d5350de1daabd99acd636.svg)](https://buildkite.com/calibre/terminal-cli)
[![NPM package](https://img.shields.io/npm/v/calibre.svg)](https://www.npmjs.com/package/calibre) [![Greenkeeper badge](https://badges.greenkeeper.io/calibreapp/cli.svg)](https://greenkeeper.io/)

## Installation

To get the latest version, run this command:

```
npm install -g calibre
```

**Other installation options**

* [Install a standalone binary](https://calibreapp.com/docs/api/binaries) Mac, Windows or Linux.
* Run the command directly with npx: `npx calibre --help`

## Features

* **Manage your performance system with a single command**: `calibre`.
* **Single page tests**. Create one-off, sharable Calibre tests for fast feedback: `calibre test create <url> --location=Frankfurt --device=iPhone6`
* **Deployments**. Track performance, best practices, accessibility and SEO between deploys
* **CI/CD/Automation**. Every command has a --json flag for machine readable output: `calibre test <url> --location=Sydney --json`
* **Scriptable**. All API methods are exported to the Calibre NPM package

## Authentication

Authentication is handled via an environment variable: `CALIBRE_API_TOKEN`. Create your token via the team API tokens page.

## Usage

```
$ calibre --help
```

## Examples

* [Bash examples](examples/bash)
* [Node.JS examples](examples/nodejs)

### Node client

The Calibre package exports a node API that can be used to automate your performance system however you’d like to. Check the examples/nodejs directory for reference.
