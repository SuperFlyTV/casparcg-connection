A response can be:

* a status code as [documented here](https://github.com/CasparCG/server/blob/master/src/protocol/amcp/AMCPCommandsImpl.cpp#L76);
* a status message, e.g. `PLAY OK`,
* zero, one line of extra information, or multiple lines of extra information.

Some commands with no parameters return the currently set values whereas with parameters cause and action to take place.

What is an _IAMCPCommand<C, REQ, RES>_ in this context? Especially given that most of the time you get given a `Promise<IAMCPCommand<C, REQ, RES>>`. Options:

- A value containing a command _C_ and options _REQ_ and completed commands response _REQ_.
- A value containing a command _C_ and options _REQ_ and a promise to resolve the response with _REQ_.

Assume that the most natural thing for a programmer is to `await` a response:

    let command = await playCg({ ... })
		if (command.response.success()) { ... }

Or would we rather:

    let command = await playCf({ ... })
		if (await command.response) { ... }

Should the response include the request as well as the status information? Yes.

Design choice:

* Change IAMCPCommand definition to `IAMCPCommand<C extends Command, REQ extends CommandOptions, RES extends REQ & IAMCPResponse>`
* Contains a `result: Promise<RES>` property.
* Resolves on success, rejects on error.

When a response contains more information than the request's parameters allow in the options object, a *Command*`Response` interface is created that extends *Command*`Options`. This adds the parameters that can be returned.
