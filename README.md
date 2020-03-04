##### <a name="toc"> table of contents </a>

* [__LICENSE:__ `G.N.U. G.P.L. 3.0`](./LICENSE) & [_why this license?_](#LICENSE_WHY)
* [CREDITS](CREDITS.md)
* [about](#about)
* [status](#status)
* [goals](#goals)
* [dependencies](#dependencies)
* [install](#installation) 
* [future installs](#installationRoadmap) 
* [user manual](https://github.com/badquanta/approval-voting-manual) (in a different repository)
* [developer documentation](#documentation) (within this repository)
* [appendix](#appendix)

---

<a name="about">[Table of contents](#toc)</a>

# Approval Voting as an Application.

You have reached the source code repository for the `approval-voting`; which is implemented as an N.P.M. package.  It has yet to be published or released; but as it stands can still be installed from this repository; 

TODO: _although it is in a non-functioning state._

Started this project on Feb 26th 2020.  Request for comments, feedback, ideas, or criticism very much welcome. __Please be brutal__; _as this  can only improve when (honest) input is given_.

See [Approval Voting on Wikipedia](https://en.wikipedia.org/wiki/Approval_voting) for basic design specifications.
See [Approval-Voting.js's Wiki](https://github.com/badquanta/approval-voting/wiki/) for information on implementation, roadmap, goals, todos, discussions, etc.
Please use [the issues tab](https://github.com/badquanta/approval-voting/issues) for discussions for bugs in _current master_ code only;
or things that need to be implemented for the [PROTOTYPE (0.0.1)](https://github.com/badquanta/approval-voting/milestone/1) version.


Design goals:

1) Keep source simple & accessible. 
2) Distributed operation.
    * People can run votes on the same question independently.  All questions and results from polling are kept in the same `revision controlled` repository that has a linear history of changes.  The content of this repository reflects that linear history; and modification of either can be detected.
    * The set of polling results can be inspected and verified as independent sets of changes before being optionally merged into large and larger `sets` of changes.  Optionally; because the system does not require that the results of polling be merged together and each can be independently inspected or tallied.  Desired in all publicly `published` results because the larger a batch of ballots, check-ins, and check-outs; the more difficult it becomes to undo the `secrecy of the ballot`.  Small batches are easier to brute force-associate. 
    * But a common linear history is maintained between the point questions were created to the point polling was closed.  Results never are saved to this history; it is always "open ended" requiring results to be computed each time they are requested.  
    * Publishing this history does not invalidate the `secrecy of the ballot`. Although `participation` in voting is explicitly not-secret, future versions may take steps to optionally obfuscate that information.  It voter information cannot be completely `secret` if the system must support `one-person-one-ballot`; a.k.a. prevent one person from voting more than one time per-ballot.
    * Squash-Merging of this history does not eliminate the ability to validate the history; nor does it allow changes that were not present be inserted into the history. The linearity of the history is backed up by it's conents.
    * Anyone with a copy of the published history may validate and tally the votes for themselves using the same `open-source` software.
3) Support for at least text-only interfaces: stdio & html; but for the prototype just command line.
    * [ ] eventually http/https
    * [ ] maybe telnet/ssh/tty interactive U.I. to support many-many "secure-local-dumb-terminals"?
    * [ ] Desktop G.U.I.(s) (or http/html/browser wrappers)
    * [ ] Mobile App(s) (may be implemented also as wrappers)
    * [ ] as well as all accessibility options via web/mobile/desktop technologies and services
      * [ ] speech to text
      * [ ] speech recognition
      * [ ] other input/output devices to think about:
        * [ ] Braille
        * [ ] Symbolic
        * [ ] Pictorial
        * [ ] Tactile
        * [ ] Auditory
        * [ ] other interfaces for Cognitive Impairment.
        * [ ] other interfaces for Visual Impairment.
        * [ ] other interfaces for Motor/Dexterity Impairment(s).
        * [ ] other interfaces for Hearing Impairment.
        * [ ] more use-cases to be thought of...
4) Allow anyone to run their own votes on their own questions for their own reasons; but also just to encourage peer review.
    * useful for everyone in many walks of life and many different group sizes.
    * families who want to choose a restaurant for tonight's dinner.
    * non-profits whom must prioritize budgets
    * organizations choosing a city to convene in next year.
    * corporations choosing the next C.E.O.
    * cities electing mayors / councilors
    * states approving ordinances
    * etc. etc. etc...

---

<a name="status">[Table of contents](#toc)</a>

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

---

<a name="dependencies">[Table of contents](#toc)</a>

### Dependencies

To run this code's repository on your system locally, you will need at a minimum:

1) Node.js v10 or higher.
2) N.P.M. (I'm running an out of date 5.8 right now to try and be compatible)
3) Git installed and at a minimum configured with a `user.name` and `user.email` so that you may `commit` changes to approval repositories.

The code at the moment mostly depends on other `npm` packages; which will be automatically installed with this project's `package.json`.
The only external dependency at the moment is `git`; and in order for `git commit` to run, one must configure their user name and email git settings.

In the future; distributable packages should exist for each supported platform that either directly provide the `git` dependency or will ensure the platform itself does, possibly instructing each platform how to install a version of `git` if one does not exist; or just failing indicating that software will be needed before one can install `approval-voting`; possibly linking to that software's home page.

---

<a name="installation">[Table of contents](#toc)</a>

### Installation

At the moment this is packaged as an `npm` package.  No other packages are being generated.

Simply run the following command (assuming linux): `sudo npm -g install https://github.com/badquanta/approval-voting`

This should make the `approval-voting` library available for inclusion into other projects.
This should also make the `aVote`(and all sub-commands) shell command available within your path.

If you do not want to install system-wide; you can run: `npm install https://github.com/badquanta/approval-voting`

This will install `approval-voting` into a direction named `node_modules`.
This will also make `aVote`(and all sub-commands) shell command accessible via: `./node_modules/.bin/aVote`.

---

<a name="installationRoadmap">[Table of contents](#toc)</a>

##### future installation options...

In the future; distributables should be available for targets directly supported by this project:
My pie in the sky list for this would be:
* [ ] Unix tarballs
* [ ] Linux software packages (deb, rpm, etc.)
* [ ] Windows self-installing or self-containing executable.
* [ ] osX version for a self-* executable; or maybe the osX version of an "App" package.
* [ ] Android app; my goal isn't to get it listed in app stores right away but once we're past 1.0
* [ ] iOS app; again I am not trying to get listed right away.

---

<a name="documentation">[Table of contents](#toc)</a>

## Documentation:

0) This [README.md](./REAMDE.md) is mostly for individuals interested in learning about, or contributing to, the internal (but public) workings of the software.
1) A [User Manual](https://github.com/badquanta/approval-voting-manual) is being _started_; but should not yet be considered accurate description of where the project currently stands.
1) How to [contribute](./CONTRIBUTING.md) directly to this software.  And/Or consider [contributing to the user manual](https://github.com/badquanta/approval-voting-manual/CONTRIBUTING.md).
1) [Core Library A.P.I.](./lib/) classes and utilities.
1) [Command Line Interface A.P.I.](./cli) class definition
1) [Executable interface](./bin) implementation details.
1) [Automated testing](./test)
1) [External dependencies](./)

---

<a name="appendx">[Table of contents](#toc)</a>

### Appendix:

* [General idea scratchpad](./IDEA.md)
* 

---

<a name="LICENSE_WHY">[Table of cotents](#toc)</a>

### Why the `G.N.U. G.P.L. 3.0` for the license?
  
  It is specifically `G.N.U. G.P.L.` to preclude the possibility of proprietary extensions.  
  Anyone may fork; the forks must be G.P.L. as well for the benefit of all implementations to peer-review and possibly incorporate changes upstream.  
  The license of the executable code must not vary.

### What about documentation, what license applies to it?

  For the same reasons the executable code is to be licensed under `G.N.U. G.P.L.`, the documentation that accompanies this source code; and any supporting media; must have a license that is, or is completely compatible with, one of the [`Creative Commons Licenses`](https://creativecommons.org/licenses/).

  I will show preference to incorporating contributions under `CC BY-SA` over the rest of the licenses, but as this is a non-commercial and non-profit project at it's core will be willing to accept `CC BY-NC-SA.`

  When it comes to `CC BY-NC-ND` and `CC BY-ND` licenses; these
  may be referenced however should not be directly incorporated into master or development branches: any code, documentation, media, etc appearing in this repository's history should be modifiable by developers of this project.  Sources of media, documentation, or code that may not be modified should be stored; referenced; fetched; from external sources upon installation or execution of this project's N.P.M. package or it's eventual distributables.

