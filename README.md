# casparcg-connection

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/SuperFlyTV/casparcg-connection/master/LICENSE) [![npm](https://img.shields.io/npm/v/casparcg-connection.svg?style=flat-square)](https://www.npmjs.com/package/casparcg-connection) [![Travis](https://img.shields.io/travis/SuperFlyTV/casparcg-connection.svg?style=flat-square)](https://travis-ci.org/SuperFlyTV/casparcg-connection) [![David](https://img.shields.io/david/superflytv/casparcg-connection.svg?style=flat-square)](https://david-dm.org/superflytv/casparcg-connection)

## Introduction

CasparCG is an open source graphics- and video server for broadcast and streaming productions. This library lets you connect and interact with CasparCG servers from Node.js in Javascript.

- Node.js
- npm package
- TypeScript/Javascript, strongly typed
- ES5 (easily compiled to ES6)
- API docs
- CasparCG AMCP 2.0 and 2.1 protocol implemented
- Parsing and validation of command parameters and response
- Queueing of commands
- Promise-based commands for easy chaining and sequences
- Helper functions for parsing of Config, Version and System info
- MIT license


## Example
```javascript
const {CasparCG} = require("casparcg-connection");

var connection = new CasparCG();
connection.play(1, 1, "amb");
```

## Documentation
Join the discussion in the [CasparCG Forum thread](http://casparcg.com/forum/viewtopic.php?f=3&t=4061).

Visit [https://superflytv.github.io/casparcg-connection/](https://superflytv.github.io/casparcg-connection/) for API documentation.

~~Examples and tutorials in the [wiki](https://github.com/SuperFlyTV/casparcg-connection/wiki).~~

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
