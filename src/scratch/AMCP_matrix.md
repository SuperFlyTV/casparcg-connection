# AMCP version matrix

The matrix below details [AMCP](https://github.com/CasparCG/help/wiki/AMCP-Protocol) protocol commands and their supported CasparCG versions. At the time of writing, CCG v2.3 refers to the [master branch of the CasparCG code](https://github.com/CasparCG/server/tree/master).

## Basic commands

| Command                                         | CCG 1.8.3 | CCG 2.0.7 | CCG 2.1.8 (NRK) | CCG 2.2  | CCG 2.3  |
| ----------------------------------------------- | --------- | --------- | --------------- | -------- | -------- |
| `LOADBG`                                        | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `LOAD`                                          | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `PLAY`                                          | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `PAUSE`                                         |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `RESUME`                                        |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `STOP`                                          | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CLEAR`                                         | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CALL`                                          |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `SWAP`                                          | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `ADD`                                           |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `REMOVE`                                        |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `PRINT`                                         |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `LOG LEVEL`                                     |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `LOG CATEGORY`                                  |           |           |  &#x2714;       |          |          |
| `SET`                                           | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `LOCK`                                          |           |           |  &#x2714;       | &#x2714; | &#x2714; |
| `ROUTE`                                         |           | &#x2714;  |                 |          |          |
| `PARAM`                                         | &#x2714;  |           |                 |          |          |

## Data commands

| Command                                         | CCG 1.8.3 | CCG 2.0.7 | CCG 2.1.8 (NRK) | CCG 2.2  | CCG 2.3  |
| ----------------------------------------------- | --------- | --------- | --------------- | -------- | -------- |
| `DATA STORE`                                    | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `DATA RETRIEVE`                                 | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `DATA LIST`                                     | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `DATA REMOVE`                                   |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |

## Template commands

| Command                                         | CCG 1.8.3 | CCG 2.0.7 | CCG 2.1.8 (NRK) | CCG 2.2  | CCG 2.3  |
| ----------------------------------------------- | --------- | --------- | --------------- | -------- | -------- |
| `CG ADD`                                        | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG PLAY`                                       | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG STOP`                                       | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG NEXT`                                       | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG REMOVE`                                     | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG CLEAR`                                      | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG UPDATE`                                     | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG INVOKE`                                     | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CG INFO`                                       | &#x2714;  | &#x2714;  |  &#x2714;       |          |          |

## Mixer commands

| Command                                         | CCG 1.8.3 | CCG 2.0.7 | CCG 2.1.8 (NRK) | CCG 2.2  | CCG 2.3  |
| ----------------------------------------------- | --------- | --------- | --------------- | -------- | -------- |
| `MIXER KEYER`                                   |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER INVERT`                                  |           |           |  &#x2714;       |          | &#x2714; |
| `MIXER CHROMA`                                  |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER BLEND`                                   |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER OPACITY`                                 |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER BRIGHTNESS`                              |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER SATURATION`                              |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER CONTRAST`                                |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER LEVELS`                                  |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER FILL`                                    |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER CLIP`                                    |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER ANCHOR`                                  |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER CROP`                                    |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER ROTATION`                                |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER PERSPECTIVE`                             |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER MIPMAP`                                  |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER VOLUME`                                  |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER MASTERVOLUME`                            |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER STRAIGHT_ALPHA_OUTPUT`                   |           | &#x2714;  |  &#x2714;       |          |          |
| `MIXER GRID`                                    |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER COMMIT`                                  |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `MIXER CLEAR`                                   |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CHANNEL_GRID`                                  |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |

## Thumbnail commands

| Command                                         | CCG 1.8.3 | CCG 2.0.7 | CCG 2.1.8 (NRK) | CCG 2.2  | CCG 2.3  |
| ----------------------------------------------- | --------- | --------- | --------------- | -------- | -------- |
| `THUMBNAIL LIST`                                |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `THUMBNAIL RETRIEVE`                            |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `THUMBNAIL GENERATE`                            |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `THUMBNAIL GENERATE_ALL`                        |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |

## Query commands

| Command                                         | CCG 1.8.3 | CCG 2.0.7 | CCG 2.1.8 (NRK) | CCG 2.2  | CCG 2.3  |
| ----------------------------------------------- | --------- | --------- | --------------- | -------- | -------- |
| `CINF`                                          | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `CLS`                                           | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `FLS`                                           |           |           |  &#x2714;       | &#x2714; | &#x2714; |
| `TLS`                                           | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `VERSION`                                       | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `INFO`                                          | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `INFO` &lt;_channel_&gt;                        | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `INFO TEMPLATE`                                 |           | &#x2714;  |  &#x2714;       |          |          |
| `INFO CONFIG`                                   |           | &#x2714;  |  &#x2714;       |          | &#x2714; |
| `INFO PATHS`                                    |           | &#x2714;  |  &#x2714;       |          | &#x2714; |
| `INFO SYSTEM`                                   |           | &#x2714;  |  &#x2714;       |          |          |
| `INFO SERVER`                                   |           | &#x2714;  |  &#x2714;       |          |          |
| `INFO QUEUES`                                   |           | &#x2714;  |                 |          |          |
| `INFO THREADS`                                  |           | &#x2714;  |  &#x2714;       |          |          |
| `INFO DELAY`                                    |           | &#x2714;  |  &#x2714;       |          |          |
| `DIAG`                                          |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `GL INFO`                                       |           | &#x2714;  |                 |          |          |
| `GL GC`                                         |           | &#x2714;  |                 |          |          |
| `BYE`                                           | &#x2714;  | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `KILL`                                          |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `RESTART`                                       |           | &#x2714;  |  &#x2714;       | &#x2714; | &#x2714; |
| `HELP`                                          |           |           |  &#x2714;       |          |          |
| `HELP PRODUCER`                                 |           |           |  &#x2714;       |          |          |
| `HELP CONSUMER`                                 |           |           |  &#x2714;       |          |          |
| `TIME`                                          |           |           |  &#x2714;       |          |          |
| `PING` (non-standard response `PONG`)           |           |           |  &#x2714;       | &#x2714; | &#x2714; |

## Schedule and timecode commands

| Command                                         | CCG 1.8.3 | CCG 2.0.7 | CCG 2.1.8 (NRK) | CCG 2.2  | CCG 2.3  |
| ----------------------------------------------- | --------- | --------- | --------------- | -------- | -------- |
| `SCHEDULE REMOVE`                               |           |           |  &#x2714;       |          |          |
| `SCHEDULE CLEAR`                                |           |           |  &#x2714;       |          |          |
| `SCHEDULE LIST`                                 |           |           |  &#x2714;       |          |          |
| `SCHEDULE INFO`                                 |           |           |  &#x2714;       |          |          |
| `SCHEDULE SET`                                  |           |           |  &#x2714;       |          |          |
| `TIMECODE SOURCE`                               |           |           |  &#x2714;       |          |          |

## Asynchronous request and response

From v2.1 onwards, all commands can be proceeded by `REQ <uid>`, where `<uid>` is a unique identifier provided by the caller. This allows a requester to send multiple overlapping requests and identify which response is related to which request, as responses messages are proceeded by `RES <uid>`.

## Command parameters

Building a matrix of what parameters are supported in which version is a challenge as different commands relate to different producers. Producer-specific parameters are parsed locally within the producer meaning the grammar is defined by that source code. The following are some notes and observations about the differences between versions.

### LOADBG, LOAD, PLAY

* Some parameters are parsed in producers, specifically SEEK, LENGTH, LOOP and FILTER in `ffmpeg_producer`
* The new `STING` transition-type in 2.1.8 changes the overall grammar of a string when present
* 2.1.8 also supports _bottom_ and _top_ directions: `FROMTOP`, `FROMBOTTOM`, `TOP`, `BOTTOM`

Transition parameters must be in order but other parameters are cherry-picked in any order in the style of command line parameters.

### CG ADD, CG UPDATE

_Data_ parameter may be XML or, from 2.1 onwards, JSON. The data must be enclosed in double quotes (`""`) and all internal quotes must be escaped (`\"\"`).

### FLS, TLS

The TLS and FLS command in CasparCG 2.2 only returns the template name rather than name, size, lastChanged and format. The separate Node-based _scanner_ process must be running.

### PING

Added for 2.1.x onwards. Has a non-standard (ie. not starting `200`/`201`/`202`) response code.


### Sources

* [AMCP-protocol sources documentation](https://github.com/CasparCG/help/wiki/AMCP-Protocol)
* [Parsing code v1.8.3](https://github.com/CasparCG/server/tree/1.8.3.0/server/amcp)
* [Parsing code v2.0.7](https://github.com/CasparCG/server/tree/2.0.7-release/protocol/amcp)
* [Parsing code v2.1.8 (NRK)](https://github.com/nrkno/tv-automation-casparcg-server/blob/2.1.x/protocol/amcp/AMCPCommandsImpl.cpp)
* [Parsing code v2.2](https://github.com/CasparCG/server/blob/2.2.0-release/src/protocol/amcp/AMCPCommandsImpl.cpp)
* [Parsing code v2.3 (master branch)](https://github.com/CasparCG/server/blob/master/src/protocol/amcp/AMCPCommandsImpl.cpp)
