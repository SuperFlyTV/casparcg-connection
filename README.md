# casparcg-connection

[![Build Status](https://travis-ci.org/SuperFlyTV/casparcg-connection.svg?branch=master)](https://travis-ci.org/SuperFlyTV/casparcg-connection)
[![GitHub version](https://badge.fury.io/gh/superflytv%2Fcasparcg-connection.svg)](https://badge.fury.io/gh/superflytv%2Fcasparcg-connection)
[![npm version](https://badge.fury.io/js/casparcg-connection.svg)](https://badge.fury.io/js/casparcg-connection)
[![dependencies Status](https://david-dm.org/superflytv/casparcg-connection/status.svg)](https://david-dm.org/superflytv/casparcg-connection)

##Introduction

CasparCG is an open source graphics- and video server for broadcast and streaming productions. This library lets you connect and interact with CasparCG servers from node.js in Javascript.

- node.js
- npm package
- TypeScript/Javascript with Typings and Sourcemaps
- ES5 or ES6
- API docs
- CasparCG AMCP 2.1 protocol implemented
- Parsing and validation of command parameters
- Parsing of response data
- Queueing of commands

##Example
```javascript
const {CasparCG} = require("casparcg-connection");

var connection = new CasparCG();
connection.play(1, 1, "amb");
```

##Documentation
Examples and tutorials in the [wiki](https://github.com/SuperFlyTV/casparcg-connection/wiki).

Visit [https://superflytv.github.io/casparcg-connection/](https://superflytv.github.io/casparcg-connection/) for API documentation.

##About

Created and published by [SuperFly.tv](http://superfly.tv)

##Roadmap
1. AMCP 2.1 parity
2. Parsing of return data to Objects and Arrays
3. Validating of responses against AMCP protocol
4. OSC events parsing
5. Smart queue with linked and grouped commands

##Acknowledgements:
- Many thanks to SVT for the CasparCG project
- Inspired by https://github.com/respectTheCode/node-caspar-cg
