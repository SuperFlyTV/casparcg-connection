# casparcg-connection

[![Build Status](https://travis-ci.org/SuperFlyTV/casparcg-connection.svg?branch=master)](https://travis-ci.org/SuperFlyTV/casparcg-connection)
[![GitHub version](https://badge.fury.io/gh/superflytv%2Fcasparcg-connection.svg)](https://badge.fury.io/gh/superflytv%2Fcasparcg-connection)
[![npm version](https://badge.fury.io/js/casparcg-connection.svg)](https://badge.fury.io/js/casparcg-connection)
[![dependencies Status](https://david-dm.org/superflytv/casparcg-connection/status.svg)](https://david-dm.org/superflytv/casparcg-connection)

##Introduction

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


##Example
```javascript
const {CasparCG} = require("casparcg-connection");

var connection = new CasparCG();
connection.play(1, 1, "amb");
```

##Documentation
Join the discussion in the [CasparCG Forum thread](http://casparcg.com/forum/viewtopic.php?f=3&t=4061).

Visit [https://superflytv.github.io/casparcg-connection/](https://superflytv.github.io/casparcg-connection/) for API documentation.

~~Examples and tutorials in the [wiki](https://github.com/SuperFlyTV/casparcg-connection/wiki).~~

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
