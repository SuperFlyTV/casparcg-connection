# casparcg-connection

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/SuperFlyTV/casparcg-connection/master/LICENSE) [![npm](https://img.shields.io/npm/v/casparcg-connection.svg?style=flat-square)](https://www.npmjs.com/package/casparcg-connection)

[![CircleCI](https://circleci.com/gh/SuperFlyTV/casparcg-connection.svg?style=svg)](https://circleci.com/gh/SuperFlyTV/casparcg-connection)

[![API Docs](https://img.shields.io/badge/Docs-Api-orange.svg?style=flat-square)](https://superflytv.github.io/casparcg-connection/) [![Guide](https://img.shields.io/badge/Docs-Getting%20started%20guide-orange.svg?style=flat-square)](https://superfly-tv.gitbooks.io/casparcg-connection-getting-started-guide/content/)


## Introduction

CasparCG Server is an open source graphics- and video server for broadcast and streaming productions. This library lets you connect and interact with CasparCG Servers from Node.js in Javascript.
This library is also a part of the [**Sofie** TV News Studio Automation System](https://github.com/nrkno/Sofie-TV-automation/).


### Features

- CasparCG AMCP 2.0 and 2.1 protocol implemented
- Parsing and validation of command parameters and response
- Queueing of commands
- Promise-based commands for easy chaining and sequences
- Helper functions for parsing of Config, Version and System info
 
### Project

- Node.js
- npm package
- TypeScript/Javascript, strongly typed
- ES5 target, easily compiled to ES2015 (ES6) or higher for more modern syntax [as described here](https://superfly-tv.gitbooks.io/casparcg-connection-getting-started-guide/content/es6-compilation.html)
- Linted with standard ESLint rules (TSLint)
- [API Docs](https://superflytv.github.io/casparcg-connection/)
- [Getting started guide](https://superfly-tv.gitbooks.io/casparcg-connection-getting-started-guide/content/)
- [MIT license](https://raw.githubusercontent.com/SuperFlyTV/casparcg-connection/master/LICENSE)

## Getting started

### Installing with NPM

```
npm install casparcg-connection --save
```

This installs the full project with sourcecode and dependencies, typescript project files and the compiled .js output with typings.

In your code, include and use the CasparCG object from this library with a code similar to:

```javascript
const {CasparCG} = require("casparcg-connection");

var connection = new CasparCG();
connection.play(1, 1, "amb");
```

_Note: starting with version 4.0.0 the default queue mode is now SALVO. You can optionally set the queue mode back to sequential if you need compatibility with CasparCG 2.0.7 or earlier. Note that the implementation of scheduled commands requires asynchronous behaviour and therefore only works in salvo mode._

### Build from source
Installing from NPM adds the dev-dependencies needed to compile TypeScript and using Gulp as build tool. A set of commands help you managing development and testing:

* **`npm run gulp`** Runs the build command and watches all `/src` files for changes, re-running the build upon each file change.
* **`npm run clean`** Empties the `/js` directory.
* **`npm run build`** Runs a single build command without watching for changes.
* **`npm run cleanBuild`**  Runs the clean command before a build command.
* **`npm run lint`** Runs code linting. Pull Requests won't be accepted without lint compliance.
* **`npm run test`** Runs code tests through Jest.

## Documentation
Join the discussion in the [CasparCG Forum thread](http://casparcg.com/forum/viewtopic.php?f=3&t=4061).

Visit [https://superflytv.github.io/casparcg-connection/](https://superflytv.github.io/casparcg-connection/) for API documentation.

Visit [https://superfly-tv.gitbooks.io/casparcg-connection-getting-started-guide/content/](https://superfly-tv.gitbooks.io/casparcg-connection-getting-started-guide/content/) for Getting started guide.

## About

Created and published by [SuperFly.tv](http://superfly.tv)

## Roadmap
1. AMCP 2.1 parity
2. Parsing of return data to Objects and Arrays
3. Validating of responses against AMCP protocol
4. OSC events parsing
5. Smart queue with linked and grouped commands

## Acknowledgements:
- Many thanks to SVT for the CasparCG project
- Inspired by https://github.com/respectTheCode/node-caspar-cg
