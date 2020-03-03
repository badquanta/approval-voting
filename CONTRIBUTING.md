# How to help

Oh my goodness how lucky (We/I) am that you are taking the time to read this document.
Thank you for reviewing how you can be of help to this endevour. 
Please let me start by stating the below suggested reading is in no-way required for people to contribute.
Questions, concerns, impressions, and all other sorts of feedback are equally welcome to that of technical contributions in the form of documentation and code.

If you are unfamiliar with the concept of approval voting, please consider checking out the Wikipedia Article on it.

Along with information about Approval voting specifically a background on other ways of voting might be useful too.
1) Plurality voting (what we largely use)
2) Ranked Choice & Runoff voting (another system proposed in alternative to Approval Voting.)

## Testing

For versions prior to 0.1 (so 0.0.0 ... 0.0.9x) there will be no requirement for testing or coverage, the goal is just a running prototype to examine and evaluate the process.
For now I'm setting hazy code-coverage & passing test goals for each minor-revision between 0.1 & 1.0; where version 0.1.0's goal is to have %10 code coverage and %10 passing tests.
Each additional version will have higher goals; until we reach 100% coverage & 100% passing tests for version 1.0.

## Your changes

The Wiki, the Issues are completely open for anyone to contribute too.
For now; this is ALSO true of the master repository; I encourage anyone to submit pull requests directly to it for evaluation.

In the future we will have designated "master"(latest release, locked), "latest-rc"(next like release version, locked) branches.. as noted these two will be locked to ensure
errant code is never pushed to them by mistake.  A "master-security-fixes" branch will exist; along with a "master-fixes" branch that will offer the latest "fixes" with the "security-fixes" branch having a shorter turn-around for approving updates to it than the "fixes" branch.
Along with all these locked; and semi-locked branches the goal is to have different "development" branches; center around topics of active development (new feature, depreciation of old features, refactoring/module work, documentation/admin work.)

## Conventions 

As of yet; no "conventions" for code, documentation, or other content has been defined.
Keeping in mind the goal of this is to garner as many "peer-reviewers" as possible; care should be taken to follow "conventions" of the open-source community at large.
Care should be given to present this software in a way that is "native" to each "peer-reviewers" platform (as much as possible.)
Mobile device users and "peer" developers should be able to think of this software applications in terms that make sense (Services, Screens/Pages, Widgets/Buttons; Text/Input)
and similarly Unix hackers should also be able to think of this software application in therms that make sense (stdin, stdout, stderr, sockets, ports, files, folders).

To that end, generally this project should be hesitant to define conventions, defining them only when necessary for collaboration purposes, and generally attempting to follow or otherwise be compatible with "larger" conventions in the open software field.


#### index.js files...

I suppose I've broken my own rule already about not defining conventions.. here is a "convention" I'm following with "index.js"
files:

1) They require-on-demand.
2) They act as "public" API interfaces.
3) They are to be POJO.
4) They are NOT to `require()` any other modules within this repository.
5) They may `require()` external modules outside of this repository.

Now why do I have this convention?  I find it helps in the following areas:

1) _Fast-loading_: because the index does not require the rest of the library when it is required, it loads faster.
2) _No circular requires_: Within this repository it is both possible (and natural) for some components to have circular dependencies.
By ensuring "index.js" files do not require when they are loaded; each component can safely require these "library indexes" and
then use them to require-on-demand other components of the library they also make use of.  Each component can be `require()`ed safely
knowing no other components will be `require()`ed UNTIL one starts calling code of that first component loaded (mostly.)
3) _Only Parse What You Need to Run_: So an added benefit of this is that only things that are referenced by executing code will actually be `require()`ed.  What this means is that time will wasted less on parsing code that will never be called.  A great example of this is the following: Each shell command script has a corresponding Class implementation.  One for `question`,`list`,`show`... etc.  However, when actually executing the `question` shell script; there is absolutely no need to also parse the class definitions of `list`,`show`... etc.  And because everything is `require()`ed-on-demand; since this will never be demanded by the `aVote-question` shell script; that time will not be wasted in parsing the other class definitions.


## Object Oriented vs. Functional

Ultimately we are speaking about syntactic sugar.  
I agree with many claims of strengths about functional programming.
I agree with some claims of strengths and many claims of critiques of object oriented programming.
I also agree; that in the end; the processor doesn't care: this is largely about how we think about problems, and thankfully we are capable of thinking about them from more than one perspective.

So I admit to having taken, surprisingly to myself, a more-object oriented approach to some problem domains.  Some of this might be a temporary artifact; to be worked into a more functional paradigm; but some of it feels the "most right" so far and might persist.  The object oriented nature of the Cli helps isolate each command from other commands; while also sharing common traits.

However what I'm trying to state here is that there is NOT a defined convention between preferring `Object-Oriented` programming vs `Function-Oriented` programming.  I'm pretty sure I could rewrite everything to take a data parameter instead of `this` and maybe we'd even see a performance boost.  What's in the code is reflective of my early years learning `object-oriented` problem solving prior to having learned `function-oriented` problem solving.

## Thank you.

Thanks from Jon David Sawyer, for taking the time to check this idea out, and considering contributing to it's success.
