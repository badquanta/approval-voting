# Approval Voting as an Application.

Just started this last night: Feb 26th. 
Don't know why I didn't start working on this in December of 2000.
See [Approval Voting]() for basic design specifications.

Design goals:

1) Keep source simple & accessable.
2) Distributed operation.  People can run votes on the same question independently.  The results can be merged; or simply handled independently.. but a common history is maintained. (implemented with GIT.)
2) Support, or at least options for text-only interfaces, especially command line; 
as well as all accessiblity options via web, native desktop services (speech to text; speech recogniztion) and mobile device features.
3) Allow anyone to run their own votes on their own questions for their own reasons; but also just to encourage peer review.

### Example Command line interface run:

Start by creating a vote:

    apprVote.js create "Who should be president?"\
      -c Bernie\
      -c Warren\
      -c Klobuchar\
      -c "Biden,Bloomber, Styer "\
      save

What this should do is create a simple `questionId` .json file. Where `questionId` is is a hash of all the data that went into defining that question.  (todo: the choices should always be stored & saved in clean-alphabetical order; to ensure hashes are the same between questions that have the same text and choices, but the order of choices differ.  `getChoices()` always copies and randomizes the order;
where as the `choices` property will return the alphabetized order. )

It'll be created in the `approvals` directory within the current working directory.. unless a different directory is specified (see `./apprVote.js --basedir | -b`).
If this directory does not exist; it will be created. If it cannot be written too, and `--force | -f` has been specified, it will be removed & recreated.
If it is NOT a git repository; it will be initialized as one.

Each `-c` is a `choice` flag. It notes a different choice a voter has for this option. Here we've defined 6 choices.  You can keep adding `-c`s, or add one with a quoted and comma-separated list of entries.

This file will be named: `approvals/{questionId}.json`. Again, the QuestionID is a hash of ALL the properties that went into defining the question.

It will have the following contents:

```json
{
  "text": "Who should be president?.json", 
  "winners": 1,
  "choices":{

    "Bernie":{"text":"Bernie"},
    "Warren":{"text":"Warren"},
    "Klobuchar":{"text":"Klobuchar"},
    "Biden":{"text":"Biden"},
    "Bloomberg":{"text":"Bloomberg"},
    "Styer":{"text":"Styer"}

  }
}
```

The last part of the command: `save`, specifies that apprVote.js should commit changes to the `approvals` (aka: `basedir`) git repository. __Note__: If the `basedir` repository isn't clean & committed & fully up-to-date, then polls should refuse to run.  This should make sure `polls` will run after this command finishes.

So now you have a `approvals/{questionId}.json`.... now what?

Now you can hold a vote; you don't NEED to specify who can vote or anything more... by default Approval voting should be easy to use so that's all that should be needed to start voting.

### Start polling questions.

Now you have that above question; you can tell the application to take votes:

    apprVote.js poll <questionId#1> ["<questionId#2>"...]

One may poll ANY NUMBER OF QUESTIONS. If none are specified; then all questions within `approvals` should be 

Since nothing else was specified; it should just clear the screen and ask this question:

    Who is voting next? <Name to appear on voter rolls>

What is typed in here is considered the voters "name."  Without specifying a voting roll; which would further specify ID requirements, this will just take any unique name entered.

However; it will fail if the name has been registered as casting a ballot.  Also note that usually hitting Ctrl-C; or otherwise quitting the application brings vote-collection to an end.

Upon hitting enter, for the above entered question, you will see:

    Collecting Ballot Entry for: 
      <Name to appear on voter rolls>

    Question #(questions order listed in CLI)
      Who should be the president?

    Choices:
      <These appear in random order EACH time>
      1. Warren
      2. Bloomberg
      3. Klobuchar
      4. Biden
      5. Styer
      6. Bernie


    You may enter the number associated, or the text.
   You may enter a minus sign before the name or number to remove them.
   You may a enter a single minus sign to clear your list of approved canidates. 
    You will have an opportunity to confirm, or clear, 
    and enter more choices.

    You have not yet selected any.
    Entering a blank line indicates you are done, 
    but you will be prompted to confirm if this is
    correct.

    Please Enter your choices:
    > ...user input...

What has occurred is that a voter has been "checked-in" to the "booth";
if at this point some other voter as some other terminal tries to identify as the same voter, they'll get notified that this voter has appeared already to vote; and options to start possibly challenging false votes.

While the program collects the ballot; the "voter" remains "in-the-booth", although this should have an optional maximum timeout to prevent "booth locking." Perhaps 30 minutes.

Say the user selects "Bernie.", so they type in just the number `6` and hits enter.

What will occur is this: The screen will clear again, and the exact same text will appear, but this time the choices will be in new order:

    Collecting Ballot Entry for: 
      <Name to appear on voter rolls>

    Question #(questions order listed in CLI)
      Who should be the president?

    Choices:
      <These appear in random order EACH time>
      1. Styer
      2. Warren
      3. Klobuchar
      4. Bloomberg
      5. Bernie
      6. Biden


    You may enter the number associated, or the text.
   You may enter a minus sign before the name or number to remove them.
   You may a enter a single minus sign to clear your list of approved canidates. 
    You will have an opportunity to confirm, or clear, 
    and enter more choices.

    You have selected:
      1. Bernie

    Please Enter your choices:
    > 

Ok; now let's say the user wants to add a few more.. they enter this: "Warren & Klobuchar".

The program is smart enough to separate by commas, semicolons, colons, and ampersands. So it will add both.  Capitalization should not be important; nor should spelling need to be exact, however it should need to be unambigious. (todo.)

Again, the screen clears:

    Collecting Ballot Entry for: 
      <Name to appear on voter rolls>

    Question #(questions order listed in CLI)
      Who should be the president?

    Choices:
      <These appear in random order EACH time>
      1. Styer
      2. Warren
      3. Klobuchar
      4. Bloomberg
      5. Bernie
      6. Biden


    You may enter the number associated, or the text.
   You may enter a minus sign before the name or number to remove them.
   You may a enter a single minus sign to clear your list of approved canidates. 
    You will have an opportunity to confirm, or clear, 
    and enter more choices.

    You have selected:
      1. Bernie
      2. Warren
      3. Klobuchar

    Please Enter your choices:
    > 

The user should be able to clear the entire list.
They may do this by entering `-` and starting over.
They may also remove a single entry, inverse of adding a single entry, by entering a `-` before the entry.  Doing so simply repeats the above process until the user entries a blank line.  At which point the system clears the screen and confirms their choices:


    Collecting Ballot Entry for: 
      <Name to appear on voter rolls>

    Question #(questions order listed in CLI)
      Who should be the president?

    You have selected:
      1. Bernie
      2. Warren
      3. Klobuchar

    Are you ready to submit this ballot?
    Yes (y) to submit your ballot and check out.
    No (n) to continue changing your ballot.
    Y/N ?

Upon entering anything other than the letters 'y','n','yes','no' or some case combination of the above; the above screen will clear; explain why the input was invalid; and repeat itself:

    "<user input>" was not a valid yes or no response:
    
    ...(previous content)...

So upon indicating YES/Y/yes/y, the ballot is created within the vote directory; and the user is marked as checked out WITH a valid ballot.

So: As check-ins, ballots and check-outs are collected they are logged in "digests."

Digests are batches of each; in debug mode this is 1 each; but otherwise this is usually at least a set of 10 each.  What "batches" do is anonymize data.  It is logged and dumped in "batches."  Each item logged should be usable to verify the integrity of either two. Two verified good items should be able to reconstruct the missing/corrupted third item; and agree which of the three is bad and which of the three is good. All three of each batch log should be referring to the same set of "check-in, ballot ,check-out" set; but EXACTLY which goes to which should be generally unknowable. 

Anyone running any copy of this software should be able to verify the data in this batch report and collect totals from all verified batch reports as well as report any data that fails to pass verification. 

## What's happening behind the scenes?

Behind the scenes; the approvals directory is a git repository.
(the following is not yet implemented, consider it a road map:)


1) When a poll is taken; that repository's "master" branch is cloned into a polling temporary directory.
2) Create new branch from the questions that includes the username, host name, etc of the "pollster" (a.k.a. the person running the approval voting software)
3) While the software is actively collecting ballots through it's inputs (various inputs include stdin, local & network sockets, express-server, gui, etc.) the ballots are buffered in memory and written to files in "batches."  The software is maintaining three independent bits of information surrounding each ballot collected: 
  1) Voter check ins: this identifies who has presented themselves to fill in a ballot, but does not in any way specify which one is theirs.  A voter that is already checked-in, or one that has been checked-out as having cast a ballot already, cannot check-in again.
  2) Individual ballots.  There can never more ballots generated than the number of individuals checked in.  Ballots can only be validly generated while there is at least one individual still checked in whom has not yet checked-out.
  3) Voter check outs: this again identifies who is checking-out, and registers weather or not they filled in & casted a ballot or left without casting a ballot.  This allows individuals who have a sudden need to cancel and return later to do so; assuming they do so while polling is still open.
4) In predefined "batches" these are written to unique and individual files, then added to the history of said cloned master repository.  The software uses the content of each ballot, voterId,etc.etc. to generate one-way hash signatures.  If one knows the values that are represented by this hash, one can re-compute and verify ballots were registered and exist within the repository.  This allows end-users to re-compute and compare ballots in publicly viewable repositories as belonging to them, yet still maintaining a "secrecy" of the ballot.  The goal is that in order to understand the signature on each ballot, you must already have all the information about whom voted on the ballot.
  1) If the software is interrupted, shutdown, or otherwise has to exit immediately than ballots/check-ins/check-outs that are COMPLETE may be written prior to exit; yet any incomplete ballot/check-in without a corresponding check-out will be discarded. 

The repository of collected ballots is only valid if the following conditions are valid:
  1) The number of ballots should exactly equal the number of "check-outs having cast a ballot".
  2) The number of "check-ins" should exactly equal the number of "check-outs without casting a ballot" + "check-outs having cast a ballot."
  3) The time-stamps of all ballots should correspond to periods of times AFTER check-ins & BEFORE check-outs; and all sums should be proper at all times. (i.e. no ballot will be written at a time there is not at least one check-in without a check-out; no check-out w/ a ballot will be written at a time where there is not at least one unaccounted for check-in & ballot.  No check-out w/o a ballot will be written at a time where there is not at least one unaccounted for check-in (also if there is only one unaccounted for check-in AND a unaccounted for ballot ALSO exists; then this check-out should not be allowed to be created/valid, in order for one person to check out w/o a cast ballot when a ballot was just cast, there must be another person currently checked-in who has yet to check-out.) )
  4) The repository of check-ins without check-outs is never greater than the number of ballots cast and every individual time-stamp
  of both commits and of the files themselves should be in absolute agreement.

All of this can be automatically verified by anyone with a copy of a repository that has results.  They should be able to verify all timestamps; uniqueness of all voters on all ballots; identify who voted & when but never whom that person voted for; identify from a larger list of eligible voters whom did not vote.

Any individual; with knowledge of whom they cast the ballot for should be also able to VERIFY the ballot exists on the record, at the right time, with the right signature, etc etc.  All they need is a copy of the repository and a copy of this software.

(All of the above is pie in the sky)