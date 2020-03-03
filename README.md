# Approval Voting as an Application.

Started this last night: Feb 26th 2020. 
Wish I had gotten started in December of 2000.
See [Approval Voting on Wikipedia](https://en.wikipedia.org/wiki/Approval_voting) for basic design specifications.
See [Approval-Voting.js's Wiki](https://github.com/badquanta/approval-voting/wiki/) for information on implementation, roadmap, goals, todos, discussions, etc.
Please use [the issues tab](https://github.com/badquanta/approval-voting/issues) for discussions for bugs in _current master_ code only;
or things that need to be implemented for the [PROTOTYPE (0.0.1)](https://github.com/badquanta/approval-voting/milestone/1) version.


Design goals:

1) Keep source simple & accessible.
2) Distributed operation.  People can run votes on the same question independently.  The results can be merged; or simply handled independently.. but a common history is maintained. (implemented with GIT.)
2) Support, or at least options for text-only interfaces, especially command line; 
as well as all accessibility options via web, native desktop services (speech to text; speech recognition) and mobile device features.
3) Allow anyone to run their own votes on their own questions for their own reasons; but also just to encourage peer review.

## Current State: Active Prototyping (0.0.0)

I haven't reached 0.0.1 even; absolutely nothing is stable and I'm drastically redefining my last steps and next steps at the moment
as I problem solve the space between my ideal solution and the implementation I can make work.

Here's what I've got working:

 - [X] aVote-question
 - [X] aVote-list
 - [x] aVote-config
 - [ ] aVote-show (in progress)

Here's what I need to finish (at least) for the prototype:

 - [ ] aVote-poll
 - [ ] aVote-tally

Verification should be done at each step of the process.
It is "o.k" if I skip some verification steps for the `0.0.1`
prototype; but for each successive version on the road to `1.0.0`
this is less and less o.k. to do on the "happy" production execution
path.