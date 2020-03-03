# c.l.i == command line interface

This is where the INTERFACE for commands are defined; see the [./bin](../bin) directory for the commands themselves which largely just instantiate the classes defined within this directory.

##### [Cmd](./Cmd.js)

This is the "Abstract Base" command.  It inherits from `Commander.js`'s 'Command' class.  It defines options that all approval voting commands share in common.  It is not intended to be directly instantiated; but rather a class extending this class should do so.

## [config](./config.js)

This is to inspect current approval-voting software configuration.  The configuration can be modified in the same way for this command as well as any other command; but this command can optional save that modified configuration to the user's home directory so that it is loaded by default on all subsequent invocations.

## [question](./question.js)

This command allows the user to define questions which will be written to the `workdir`.

## [poll](./poll.js)


This command allows the user to begin the polling of questions.  The user may optional specify an ordered sub-set of questions existing within the `workdir` to poll; but defaults to polling all of them in the order they were originally defined.  This command will clone and branch the `workdir` repository to a temporary `workdir`.  It will commit changes to this `workdir` in batches; and optionally can be configured to push it's `workdir` to the originating `workdir` periodically; or with each batch.  There are rules that specify when the repository is valid; and invalid states should NEVER be pushed to the origin.  The origin has final say which results are pulled into master.

## [show](./show.js)

This command allows the user to inspect the defined questions.  It may specify, like with poll, and ordered sub-set of questions to inspect.

## [list](./list.js)

This command allows the user to list (and filter/search) defined questions.  This can be used to generate the sub-set of defined questions that could then be passed to commands like `show` or `poll`.

## [tally](./tally.js)

This command allows the user to compute the tallies of all results that have been merged into