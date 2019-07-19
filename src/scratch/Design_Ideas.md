# Design ideas for connection library rehaul

* Node API version independent, changes behaviour based on `VERSION` call
* Deprecate multiple command parameters in favour of options object ... but auto-detect. E.g. every first parameter is:

    load(channelOrOptions: number | LoadOptions, layer?: number, ... )

* Alternatively, build a completely new interface and slave the old interface to it.
* Define a set of interfaces for options, e.g. LoadOptions.
* [This section of the Typescript documentation](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#using-modules) suggests that Namespaces are **not** the way to go.
