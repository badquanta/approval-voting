#!/usr/bin/env node
const showDontYell = require('../lib/showDontYell');
const Question = require('../lib/Question');
//showDontYell();
const Debug = require('debug');
const Fs = require('fs');

/**  **/
const apprVote = require('../lib/cli');
const NAME = require('../lib/name');
const cfg = require('../lib/approval-voting.json');
//showDontYell();



function apprVotingAtExit() {

}

if (process.mainModule == module) {
  process.setUncaughtExceptionCaptureCallback((err) => {
    console.error(err);
    process.exit(err);
  })
  process.on('uncaughtException',(err)=>{
    console.error(err);
    process.exit(err);
  });
  process.on('unhandledRejection',(reason)=>{
    console.error(reason);
    process.exit(reason);
  });
  argv_init = process.argv.slice(0,1);
  args = process.argv.slice(2);  
  
  while(args.length>0){
    console.log('pre-parse args:',args);
    args=apprVote.parse(argv_init.concat(args)).args;
    console.log('post-parse args:',args);
  }

  /** run actions **/
  console.debug();
}
/** finish **/
// effectively, process.exit(EXIT_OK), but wait on promises too.
module.exports = apprVote;