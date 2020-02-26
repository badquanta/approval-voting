# Approval Voting as an Application.

Design goals:

1) Keep source simple & accessable.
2) Support, or at least options for text-only interfaces, especially command line; 
as well as all accessiblity options via web, native desktop services (speech to text; speech recogniztion) and mobile device features.
3) Allow anyone to run their own votes on their own questions for their own reasons; but also just to encourage peer review.

### Example Command line interface run:

Start by creating a vote:

    apprVote.js new "Who should be president?" -c Bernie -c Warren -c Klobuchar -c Biden -c Bloomber -c Styer

What this should do is create a simple `question` .json file. Where `question` is everything between the quotes: `Who should be President` .  It'll be created in the `approval` directory; in the current working directory.. unless a different directory is specified (see help.)

Each `-c` is a `choice` flag. It notes a different choice a voter has for this option.

This file will be named: `Who should be president?.json` 

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

So now you have a approve/question.json.... now what?

Now you can hold a vote; you don't NEED to specify who can vote or anything more... by default Approval voting should be easy to use so that's all that should be needed to start voting.

### Start voting

Now you have that above question; you can tell the application to take votes:

    apprVote.js "./Who should be president?.json" start

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

What has occured is that a voter has been "checked-in" to the "booth";
if at this point some other voter as some other terminal tries to identify as the same voter, they'll get notified that this voter has appeared alredy to vote; and options to start possibly challenging false votes.

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
They may also remove a single entry, inverse of adding a single entry, by entering a `-` before the entry.  Doing so simply repeats the above process until the user entres a blank line.  At which point the system clears the screen and confirms their choices:


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

So: As check-ins, ballots and check-outs are collected they are loged in "digests."

Digests are batches of eatch; in debug mode this is 1 each; but otherwise this is usually at least a set of 10 each.  What "batches" do is anonomize data.  It is logged and dummped in "batches."  Each item logged should be usable to verify the integrity of either two. Two verified good items should be able to reconstruct the missing/corrupted third item; and agree which of the three is bad and which of the three is good. All three of each batch log should be referring to the same set of "checkin-ballot-checkout" set; but EXACTLY which goes to which should be generally unknowable. 

Anyone running any copy of this software should be able to verify the data in this batch report and collect totals from all verified batch reports as well as report any data that fails to pass verification. 