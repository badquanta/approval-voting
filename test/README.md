# Approval voting automated testing.

To run all of the unit tests, simply run this command from a working copy of this software repository:

    $ git clone https://github.com/badquanta/approval-voting.git
    $ cd approval-voting
    $ mocha

That last command will run all `*_test.js` files defined in the top-level of this directory.
These are considered "Unit" tests of the library.  This is the same as running the command `mocha test`.

One may also specify one, or more than one individual test file to run; and mocha will only run those. For instance:

    $ mocha test/Question_test.js test/WorkDir_test.js

Will only test those two units.  In exactly the same one; one can specify a different directory to use; instead of just "test."

    $ mocha test/cli

Will run, like `mocha test`, all the `*_test.js` files that are within the directory `./test/cli`.  `cli` stands for C.L.I. ("Command Line Interface"); and much as the word "Interface" suggests; that is all this is testing: the "interface" between the command line & the rest of the library; but this is also known as "integration" testing; where you validate that whole components work and work together in work-flows.

There may be other folders which perform other types of test.  Simply running mocha test will run the bare-minimum logical tests of just the core `lib` directory.  In order to run every test defined under this directory; one can simply pass `--recursive` to the `mocha` command as so:

    $ mocha --recursive ./test

That `./test` part is entirely optional; and has the same effect the default value would have had anyways but is there to show you that a any directory could be specified; so different types of test could be organized within, or outside of, this test directory.

