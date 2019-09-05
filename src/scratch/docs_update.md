# AMCP documentation Updates

### PING

The `PING` command allows connectivity with the server to be tested, primarily for liveness heartbeats and to avoid socket timeouts. The response is `PONG`.

`PING` cannot be used with `REQ`. A token can be provided so the a specific `PING 1234` request can be matched with a specific `PONG 1234` response.

## Other missing commands

* TIMECODE SOURCE
* SCHEDULE SET/REMOVE/LIST/CLEAR/INFO
* TIME
* ROUTE (2.0.7 only)

## Documentation requiring enhancement

* CALL - during task to identify specific parameters
