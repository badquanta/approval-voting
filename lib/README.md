# Approval Voting Library:

These are the basic units that go into this process of approval voting:

* [Question](./Question.js) these are the individual questions that can be presented to voters when polling.
* [Ballot](./Ballot.js) these are the collection of responses to questions presented to voters when polling.
* [CheckIn](./CheckIn.js) these are records of voters identifying themselves to have questions presented and ballots filled in.
* [CheckOut](./CheckOut.js) these are records of voters already checked-in registering their completion of questions and ballot filling; also registering the casting, or non-casting of said ballot. 

Some additional "plumbing" is needed to support the above:

* [*BaseDirSync]() are functions ensuring the "working directory" exists (todo: and is a git repository), lists, loads, and searches the questions inside.
* [version](./version.js),[name](./name.js) are just convenience modules that map to the corresponding package fields.

TODO: more documentation once this directory finalizes it's contents.