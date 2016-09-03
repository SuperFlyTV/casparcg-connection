# casparcg-connection

[![Build Status](https://travis-ci.org/SuperFlyTV/casparcg-connection.svg?branch=master)](https://travis-ci.org/SuperFlyTV/casparcg-connection)
[![GitHub version](https://badge.fury.io/gh/superflytv%2Fcasparcg-connection.svg)](https://badge.fury.io/gh/superflytv%2Fcasparcg-connection)
[![npm version](https://badge.fury.io/js/casparcg-connection.svg)](https://badge.fury.io/js/casparcg-connection)
[![dependencies Status](https://david-dm.org/superflytv/casparcg-connection/status.svg)](https://david-dm.org/superflytv/casparcg-connection)


node.js Javascript/TypeScript library for CasparCG connection and commands.

##Introduction

##Example
```javascript
const {CasparCG} = require('casparcg-connection');

var connection = new CasparCG();
connection.play(1, 1, 'amb');
```

##About

Created and published by [SuperFly.tv](http://superfly.tv)

## Acknowledgement:
- Many thanks to SVT for the CasparCG project
- Inspired by https://github.com/respectTheCode/node-caspar-cg
