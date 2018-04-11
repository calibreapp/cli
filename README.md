![Calibre CLI - Automate your performance system](https://user-images.githubusercontent.com/924/33245064-93ef3f98-d356-11e7-8048-a8446100356c.png)

[![Build status](https://badge.buildkite.com/5e41ea8c42fa868fc2c41c063e742d5350de1daabd99acd636.svg)](https://buildkite.com/calibre/terminal-cli)
[![NPM package](https://img.shields.io/npm/v/calibre.svg)](https://www.npmjs.com/package/calibre)

## Installation

To get the latest version, run this command:

```
npm install -g calibre
```

Optionally, you can clone this repo and run `npm run build` to produce a standalone binary for Mac, Windows or Linux.

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

## Node client

The Calibre package exports a node API that can be used to automate your performance system however you’d like to. Check the examples/nodejs directory for reference.
