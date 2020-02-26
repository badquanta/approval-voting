#!/usr/bin/env node
const showDontYell = require('../lib/showDontYell');
const Question = require('../lib/Question');
showDontYell();
const Path = require('path');
const Debug = require('debug');
const Fs = require('fs');
const RdLnIntr = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
/**  **/
const apprVote = require('commander');
const dbg = require('../lib/dbg');
const NAME = require('../lib/name');
showDontYell();
/** @link https://github.com/tj/commander.js#examples */
function collect(value, previous) {
  return previous.concat([value]);
}
/**
 * create `basedir`
 * as if you ran `mkdir -p $basedir`
 * @todo make async
 */
function makeBaseDirSync() {
  dbg.warn('Creating basedir',apprVote.basedir);
  let mkdirp = require('mkdirp');
  mkdirp.sync(apprVote.basedir);
}
/**
 * remove the existing `basedir`
 * @todo make async
 */
function removeBaseDirSync() {
  dbg.warn(`Force enabled, unable to write directory so removing: rm -rf ${apprVote.basedir}`);
  let rimraf = require('rimraf');
  rimraf.sync(apprVote.basedir);
}
/**
 * ensure that the `basedir` both exists & is writable by us.
 * @todo make async
 */
function ensureBaseDirSync() {
  dbg('ensure base dir', apprVote.basedir)
  if (Fs.existsSync(apprVote.basedir)) {
    dbg.verbose('basedir exists');
    let access = undefined;
    try{
       Fs.accessSync(apprVote.basedir, Fs.constants.R_OK | Fs.constants.W_OK);
       access = true;
    } catch(e){
       access = false;
    }
    dbg.verbose('access rights on existing basedir?',access);
    if (access) {
      dbg.verbose('but we can write to it so that is ok.');
    } else {
      dbg.verbose('and we cannot write to it...')
      if (!apprVote.force) {
        dbg.verbose('and we cannot do anything about it (missing -f/--force)');
        throw new Error(`Cannot write to basedir: ${apprVote.basedir}`);
      } else {
        dbg.verbose('we can try to remove it...');
        removeBaseDirSync();
        dbg.verbose('and then create it...');
        makeBaseDirSync();        
      }      
    }
  } else {
    dbg.verbose('basedir does not exist, attempting to create...');
    makeBaseDirSync();
  }
}
/** `apprVote.js` CLI -- general options */
apprVote
  .option('-f, --force', 'force actions, such as removing existing files.', false)
  .option('-b, --basedir <path>', 'Specify the directory all files are created within.', 'approvals')
  .option('-v, --verbosity [verbosity]', 'Specify `debug` pattern of output', function(val){
    if(val===null){
      Debug.enable(`${NAME}*`);
    }else{
      Debug.enable(`${NAME}*, ${val}`);
    }
  },null)
  .option('--verbose',
  `when specified, basicaly $DEBUG=* will take effect.`,
  function(){
    Debug.enable("*");
  })//--verbose
  .option('-q, --quiet',
  `shen specified, basical $DEBUG='' will take effect.`,
  function(){
    Debug.enable("");
  })//-q/--quiet
/** `apprVote.js` CLI -- COMMAND "start" */
apprVote
  .command('start')
  .description(
    `Start collecting ballots from voters on a question:`
  )
  .action(function startBallot(options) {
    RdLnIntr.question("Who is voting next?",
      function onNextVoter(voterId) {
        var checkIn = Voter.checkIn(voterId);
        let ballot = new Ballot(checkIn, Question.getAll());
        function askQuestion(question, aQidx) {
          let choices = question.getChoices();
          let choiceText = choices.map((choice, aCidx) => {
            return `${aCidx + 1}\t ${choice.text}\t\t${choice.description}`
          });
          let questionText
            = ```
              Collecting Ballot Entry For: 
              \t${voterId}
              
              Question #${aQidx} of ${ballot.questions.length}
              \t${question.text}

              \t\t${question.description}

              Choices:
              ${choiceText.join('\n')}

              Please Enter your choices:
              >```
          return new Promise(function (resolve, reject) {
            RdLnIntr.clean();
            RdLnIntr.question(
              `Which do you approve?
              `,
              collectBallotQuestion
            );//rl.question()
            function collectBallotQuestion(input) {

            }
          })//new Promise(...)

        }
        return Promise.all(ballot.questions.map(askQuestion));
      }
    );
  });
/** `apprVote.js` CLI -- COMMAND "new" */
apprVote
  .command('new <question_text_json_path> [description]')
  .description(
    `create a new vote.json and polls.json in a new
    directory named <basedir>/<question_text>.json`
  )
  /** @param flags
   * @param description
   * @param {default_value or function}... 
   ***/
  .option('-w, --winners <number>',
    `usually 1, or most common choice of all. Can be more than one.`,
    '1')
  .option('-c, --choice <text>',
    'One of the options to approve; at least two REQUIRED.',
    collect,
    []
  )
  /** TODO Move voter stuff elsewhere:
  .option('-v, --voters <named_secrets>',    
    `Not required, but allows participation to be limited to
named individuals with optional "secrets/password" authenticators;
otherwise first-come-first-registered.`, 
  collect,
  [])
  */
  /**  **/
  .option('-t, --ties <resolver>',
    `Defaults to reVote50; with bottom 50% of choices removed from last results.`,
    'reVote50')
  /**  **/
  .action(function (question_text_json_path, description, options) {
    //showDontYell();
    var question;
    if (Fs.existsSync(question_text_json_path)) {
      question = Question.load(question_text_json_path);
    } else {
      question = Question.clean(question_text_json_path);
    }
    if (description) {
      question.description =
        question.description ?
          `${question.description} ${description}`
          :
          description;
    }
    if ((question.winners && apprVote.winners) && (question.winners != apprVote.winners)) {
      throw new Error(
        `Number of Winners contra-specified. Pick either: ${question.winners} or ${winners}`
      );
    } else { question.winners = apprVote.winners; }

    question.addChoices(options.choices);
    let choices = question.getChoices();
    
    for (let idx = 0; idx < choices.length; idx++) {
      dbg(`Choice #${idx + 1}: "${choices[idx].text}"`);
    }
    ensureBaseDirSync();
    questionPath = `${apprVote.basedir}/${question.text}.json`
    if (Fs.existsSync(questionPath)) {
      if (apprVote.force) {
        dbg.warn(`Removing existing file at: ${Path.resolve(question.text)}`);
        let rimraf = require('rimraf');
        rimraf.sync(questionPath);
      } else throw new Error(`Path already exists for question: ${questionPath}`)
    }
    Fs.writeFileSync(questionPath, JSON.stringify(question, null, 2), { encoding: 'utf8' })


    // TODO: Move Voter stuff elsewhere:    
    /*if(Fs.existsSync('./voters.json')){
      dbg("Existing voters.json found, loading...");
      var oldVoters = require('./voters.json');
      dbg("concating to new voters:")
      voters.concat(oldVoters);      
    } join all -v into one "comma" sparated string.
    if(voters.length>0){
      Fs.writeFileSync('./voters.json',JSON.stringify(voters,null,2),{encoding:'utf8'});
      dbg('updated voters.json');
    }
    let voters = options.voters.concat(question.voters).join(', ');    
    // now split all 
    /
    dbg("New Voter Summary:");
    console.debug("Question: ", question);    
    console.debug(voters);
    **/
  });
function apprVotingAtExit(){

}
if (process.mainModule == module) {
  process.setUncaughtExceptionCaptureCallback((err)=>{

    process.exit(err);
  })
  /** run actions **/
  apprVote.parse(process.argv);
  dbg(`Approval Voting Version: ${require('../lib/version')}`);
}
/** finish **/
// effectively, process.exit(EXIT_OK), but wait on promises too.
module.exports = apprVote;