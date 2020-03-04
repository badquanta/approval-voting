##### <a name="toc">table of contents</a>

* [back to README](./README)
* [developers](#developers)
* [documentation CREDITS](#documentation)....
* []
# CREDITS

## developers:

_Please make sure that if your name shows up in the revision control history; that you also include yourself on this list:_

0) Jon David Sawyer (a.k.a. `BadQuanta`) 
    * [homepage](https://badquanta.github.io)
    * [GitHub homepage](https://github.com/BadQuanta) 
0) __your name here__
    * [_your homepage here_](https://your.home/page#url)
    * ...

---
##### TODO: maybe move the following _rant_ elsewhere?
##### [approval-voting user manual credits](https://github.com/badquanta/approval-voting-manual/CREDITS.md) are documented within that repository to be ensured they are included with each edition of that documentation, due to slight licensing differences this cannot be unified.

That licensing difference is this: documentation and example source code is published under the Creative Commons license.
The source code in this repository is licensed under the G.N.U. G.P.L.

All entities are welcome to do with what they please; anything goes really; with the documentation and examples.  They can't stop others from doing the exact same thing; but they don't have to share their changes with the rest of us.

All entities must follow the terms of the `G.N.U. G.P.L.` regarding any changes made to __this__ repository: they may not share anything generated FROM this program without sharing the the SOURCE of those changes. Doing so violates the terms and spirit of the `G.N.U. G.P.L.`

Again; this is not true of the `approval-voting-manual` repository.  Should a private individual decide to improve the documentation; they may start with this as a basis and improve upon it.  They may then publish some generated documentation;video;etc;etc;etc.. they are not required to publish the sources from which they comprised that generated documentation.  They are; however; required to give CREDIT (under the Creative commons license agreement) to the sources from which they derived their work.

---
[back](./README) | [top: table of contents](#toc)
## N.P.M. dependencies:

##### TODO: make sure this is up-to-date for each release:

* [commander]().js `^4.1.1` provides the framework for the command line interfaces (for now; considering moving to other/own framework)
* [debug]().js `^4.1.1` provides the current extent of print line debugging, can be disabled or have the verbosity increased/decreased at any point.
* [mkdirp]().js `^1.0.3` provides a JavaScript implementation of the common Unix command: `mkdir -p`
* [object-hash]().js `^2.0.3` provides a means of digesting a Plain-old-JavaScript-object into a single "hash" string that should (more-or-less) uniquely identify each object sharing the same values.
* [rimraf]().js `^3.0.2` provides a means of removing a folder and all of its contents; much like the Unix command: `rm -rf`

---
[back](./README) | [top: table of contents](#toc)
### development dependencies:

* [mocha]().js `^7.0.1` automated testing has barely been started; but will be vital to ensure bugs are fixed and behavior is not unintentionally regressed or broken.

---
[back](./README) | [top: table of contents](#toc)
## non-N.P.M. dependencies:

Currently the system relies on the presence of `git`
and is also only being tested on `linux` systems
with a `bash` command line interface.  Future interfaces for various target platforms need to be implemented and tested.

* [git]() `^2.20.1` the version currently being used by `BadQuanta` on his `ubuntu linux` system; may generalize to a lower more common version in the future 

---
[back](./README) | [top: table of contents](#toc)

##### TODO: `git 2.0` maybe?
##### TODO: fill in all the blank links to dependency pages.
