<a name="goto"> Go to: </a>
<a href="#about">about</a> |
<a href="#status"> status </a> |
<a href="#installation"> install </a> |
<a href="#installationRoadmap"> future installs </a> |
<a href="#documentation"> documentation </a> |
<a href="#appendix"> appendix </a>

---

<a name="about"><a href="#goto">top</a></a>

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

---

<a name="status"><a href="#goto">top</a></a>

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

<a name="installation"><a href="#goto">top</a></a>

### Installation

At the moment this is packaged as an `npm` package.  No other packages are being generated.

To install this on your system locally, you will need at a minimum:

1) Node.js v10 or higher.
2) N.P.M. (I'm running an out of date 5.8 right now to try and be compatible)
3) Git installed and at a minimum configured with a `user.name` and `user.email` so that you may `commit` changes to approval repositories.

Simply run the following command (assuming linux): `sudo npm -g install https://github.com/badquanta/approval-voting`

This should make the `approval-voting` library available for inclusion into other projects.
This should also make the `aVote`(and all sub-commands) shell command available within your path.

If you do not want to install system-wide; you can run: `npm install https://github.com/badquanta/approval-voting`

This will install `approval-voting` into a direction named `node_modules`.
This will also make `aVote`(and all sub-commands) shell command accessible via: `./node_modules/.bin/aVote`.

---

<a name="installationRoadmap"><a href="#goto">top</a></a>

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

<a name="documentation"><a href="#goto">top</a></a>

## Documentation Table of contents:

  Please make sure you agree to the terms of the [`G.N.U. G.P.L. 3.0`](./LICENSE)

  __note:__ It is specifically G.N.U. G.P.L. to preclude the possibility of proprietary extensions.  Anyone may fork; the forks must be G.P.L. as well for the benefit of all implementations to peer-review and possibly incorporate changes upstream.  The license of the executable code must not vary.

0) This [README.md](./REAMDE.md)
1) How to [contribute](./CONTRIBUTING.md)
2) How to [use](./USEAGE.md)
3) [Core Library A.P.I.](./lib/)
4) [Command Line Interface A.P.I.](./cli)
5) [Executable interface](./bin)
6) [Automated testing](./test)

---

<a name="appendx"><a href="#goto">top</a></a>

### Appendix:

* [General idea scratchpad](./IDEA.md)
* 