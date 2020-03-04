# 0.0.1 @2020-03-03: March 3rd, 2020

  7 ~ 8 days in; I don't have too much progress to show.  
  I have spent way more time documenting my goals; than implementing them.
  I'll claim to have pinned down most of how I want the system to operate:
  -> working dir repo.
  -> cloning a source repo when polling; branching/pulling/syncing into a ballot_hash repo; and further branching into a pollster_hash branch representing each running process actively collecting polling results.
  -> questions as {question_hash}.json files.
  -> ballots as {ballot_hash}/ folders.
  -> check-ins; check-outs; and ballots will be individual files within the {ballot_hash}/ folders,
but as to how I exactly want to structure this needs further definition.
  -> polling; while occurring; should be pushing their individual branches to the origin; and upon each pollster declaring their work complete and valid merging into the {ballot_hash} branch and then deleting their own temporary working branches, clones, and optionally even removing their working branches from the origin repository as well. (maybe pull requests)
  -> when it comes to verifying: the revision control history will be the first line of verification that nothing funky has occurred to the `digital paper trail`; but it is at most half the method of verification.  Files and folders will have names which are hashes of their original contents, they date they were created, etc etc etc.  Modification of any of these values would be detectable; as well as modification of history surrounding the order these files were created, as the hashes (TODO: should always) depend on that as well.
  -> Each recorded ballot response depends on questions, their hash specifically and the order of which that hash appears in the revision history/timestamps/etc; and individual question results depend on a valid check in, and a check out indicating a cast ballot. A check in depends on a check in existing; again in the right order of revision control history, timestamps, and hash values computed referencing those things.
  -> All of that ensures that if any little bit is out of alignment; we should be able to detect that.  Signatures will not line up; different types of verification will fail.. etc... but at the same time identical copies of the software, running identical settings, should be able to verify; even replicate; each others work. (note; this might require the ability to pretend a later run is being run at a previous time to get identical results.)
  --> With the trust that every file can be verified to be a true and honest; not-duplicate; ballot for an individual voter (given by previous statements); the process of Tallying the vote becomes mundane: simply read, parse, and sum the approvals and non-approvals.  One last verification can be obtained in the fact that all the sums of approvals; non-approvals; voters; voter-check-ins; voter-check-outs-with-casting-a-ballot; and voter-check-ins-not-casting-a-ballot; match with the total number of ballots, and the sum of each question's approved choices plus the sum of the questions non-approved questions; equals the number of ballots found for that question; which also equals the number of check-out-with-a-ballot; which should also equal check-ins MINUS check-out-without-a-ballot... etc. etc. etc. etc.

I need to get to making working demos.. then maybe a few videos of those working demos to get more interest in participation for the long term goals of this project......
  
## 0.0.0 @ February 25th 2020: project start

Didn't have much of a clear idea.. didn't document my initial thoughts other than in code and now that's in the revision control's history...

The initial thrust is this: get open-source electronic voting into everybody's hands for peer review.

### Goal:
* People help improve the open-source electronic voting system,
* and eventually they learn that they have control of it;
* they learn they can improve and review it;
* they know (or can learn) how it works;
* they can re-run the same steps anyone else did with the software;
  * and verify that nothing's different with someone else's results and their own.
  * compare how changes between versions of the software would modify results, if they would, and how.

The eventual goal is that we are able to own our own voting system. Take responsibility for it; not some profit driven entity but the people who depend on it. And maybe we'll use it for the big stuff one day, like national political votes.

But until it's useful for everybody else, it probably will never get there.  So I'm focusing on families that need to decide where they are going to vacations; or offices that want to democratize the selection of snacks in meetings; conferences that let members decide what city they all want to meet up for this year's annual meeting. etc. etc. etc..

There are a lot of opportunities for democracy; at all levels in life.  Putting this tool into their hands is the goal... and I guess where this log of changes starts.