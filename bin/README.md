# bin/aVote*

Each of these files are very-simple wrappers to corresponding `c.l.i.` classes.  See the [cli](../cli) directory.

Each of these files is intended to act as the point of interface for end-users.

Each of these files accomplishes one task, then exits indicating success with a code of `0` and a failure with any other value.

Each is marked in unix-terms as executable and has a `shebang` or `#!...` entry as the 0th line of text (specifically `#!/usr/bin/env node`)

Each should be listed in [package.json](../package.json) so that users may optionally `sudo npm install -g approval-voting`; and make the `aVote*` commands available globally.  (Note: unless specified in a user-based configuration file; the default working directory is always relative to the current working directory each command is spawned with.)