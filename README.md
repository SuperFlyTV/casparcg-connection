# casparcg-connection

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/SuperFlyTV/casparcg-connection/master/LICENSE) [![npm](https://img.shields.io/npm/v/casparcg-connection.svg?style=flat-square)](https://www.npmjs.com/package/casparcg-connection)

[![API Docs](https://img.shields.io/badge/Docs-Api-orange.svg?style=flat-square)](https://superflytv.github.io/casparcg-connection/) [![Guide](https://img.shields.io/badge/Docs-Getting%20started%20guide-orange.svg?style=flat-square)](https://superfly-tv.gitbooks.io/casparcg-connection-getting-started-guide/content/)

## Introduction

CasparCG Server is an open source graphics- and video server for broadcast and streaming productions. This library lets you connect and interact with CasparCG Servers from Node.js in Javascript.
This library is also a part of the [**Sofie** TV News Studio Automation System](https://github.com/nrkno/Sofie-TV-automation/).

### Features

- CasparCG AMCP 2.3 protocol implemented
- CasparCG AMCP 2.1 protocol largely implemented
- Parsing of command parameters and response
- Queueing of commands
- Promise-based commands for easy chaining and sequences

### Project

- Node.js
- npm package
- TypeScript, strongly typed
- ES2020 target
- Linted with standard ESLint rules
- [API Docs](https://superflytv.github.io/casparcg-connection/)
- [MIT license](https://raw.githubusercontent.com/SuperFlyTV/casparcg-connection/master/LICENSE)

## Getting started

### Installing with NPM

```
npm install casparcg-connection --save
```

This installs the full project with sourcecode and dependencies, typescript project files and the compiled .js output with typings.

In your code, include and use the CasparCG object from this library with a code similar to:

```javascript
const { CasparCG } = require('casparcg-connection')

const connection = new CasparCG()
const { error, request } = await connection.play({ channel: 1, layer: 1, clip: 'amb' })
if (error) {
	console.log('Error when sending', error)
} else {
	const response = await request
	console.log(response)
}
```

_Note: as of 6.0.0 the library has had a major rewrite with significant API changes and support for CasparCG 2.0 was dropped._

### Build from source

Installing with yarn adds the dev-dependencies needed to compile TypeScript. A set of commands help you managing development and testing:

- **`yarn clean`** Empties the `/dist` directory.
- **`yarn build`** Runs a single build command without watching for changes.
- **`yarn build -w`** Rebuilds on every change.
- **`yarn lint`** Runs code linting. Pull Requests won't be accepted without lint compliance.
- **`yarn test`** Runs code tests through Jest.

## Doing a release

Run `yarn changelog` to generate the changelog, tags and commit. Push these changes and the newly made tag.

## Documentation

Visit [https://superflytv.github.io/casparcg-connection/](https://superflytv.github.io/casparcg-connection/) for API documentation.

## About

Created and published by [SuperFly.tv](http://superfly.tv)

## Acknowledgements:

- Many thanks to SVT for the CasparCG project
- Inspired by https://github.com/respectTheCode/node-caspar-cg
