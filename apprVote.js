#!/usr/bin/env node
const showDontYell = require('./showDontYell');
showDontYell();
const Path = require('path');
const Fs = require('fs');
const EXIT_FAILED_REQUIRED = -1;
const EXIT_UNKOWN_JSON = -2;
const EXIT_FAILED_UNKNOWN = -120;
const EXIT_OK = 0;
const Package = require('./package.json');
const APPROVAL_VOTING_VERSION = Package.version;
const Question = require('./Question');
const rl = require('readline').createInterface({
  input:process.stdin,
  output:process.stdout
});
/**  **/
const apprVote = require('commander');
/** votes center around "questions" **/
let question = undefined;
showDontYell();
/** @link https://github.com/tj/commander.js#examples */
function collect(value, previous) {
  return previous.concat([value]);
}
/** general options */
apprVote
  .option('-f, --force', 'force actions, such as removing existing files.')

apprVote
  .command('start')
  .description(
    `Start collecting ballots from voters on a question:`
  )
  .action(function startBallot(options){
    rl.question("Who is voting next?",
      function onNextVoter(voterName){

        function collectBallot(input){

        }
      }
    );
  });
/**  **/
apprVote
  .command('new <question_text_json_path> [description]')
  .description(
    `create a new vote.json and polls.json in a new
    directory named <question_text>/`
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
  .option('-v, --voters <named_secrets>',
    /**  **/
    `Not required, but allows participation to be limited to
named individuals with optional "secrets/password" authenticators;
otherwise first-come-first-registered.`, 
  collect,
  [])
  /**  **/
  .option('-t, --ties <resolver>',
    `Defaults to reVote50; with bottom 50% of choices removed from last results.`,
    'reVote50')
  /**  **/
  .action(function (question_text_json_path, description, options) {
    //showDontYell();
    let winners = parseInt(options.winners)
    if (!winners >= 1) throw new Error("Winners must be an whole number.");    
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
    if ((question.winners && winners)&&(question.winners!=winners)){
      throw new Error(
        `Number of Winners contra-specified. Pick either: ${question.winners} or ${winners}`
      );
    }else{question.winners=winners;}
    // join all -v into one "comma" sparated string.
    let voters = options.voters.concat(question.voters).join(', ');    
    // now split all /,\s*/
    voters = voters.split(/,\s*/g).filter((v)=>(v!==''&&v!=undefined));
    console.log("New Voter Summary:");
    console.debug("Question: ", question);    
    console.debug(voters);
    
    let choices = options.choice.map((choiceText) => {
      let choice = { text: choiceText };
      return choice
    });
    question.choices = choices;
    for (let idx = 0; idx < choices.length; idx++) {
      console.log(`Choice #${idx + 1}: "${choices[idx].text}"`);
    }
    if(Fs.existsSync(question.text)){
      if(apprVote.force){
        console.warn(`Removing existing file at: ${Path.resolve(question.text)}`);
        let rimraf=require('rimraf');
        rimraf.sync(question.text);
      }else throw new Error(`Path already exists for question: ${question.text}`)
    }    
    Fs.writeFileSync(`${question.text}.json`,JSON.stringify(question,null,2),{encoding:'utf8'})
    if(Fs.existsSync('./voters.json')){
      console.log("Existing voters.json found, loading...");
      var oldVoters = require('./voters.json');
      console.log("concating to new voters:")
      voters.concat(oldVoters);      
    }
    if(voters.length>0){
      Fs.writeFileSync('./voters.json',JSON.stringify(voters,null,2),{encoding:'utf8'});
      console.log('updated voters.json');
    }
  });
if(process.mainModule == module){
  console.log(`Approval Voting Version: ${APPROVAL_VOTING_VERSION}`);
  /** run actions **/
  apprVote.parse(process.argv);
}
/** finish **/
// effectively, process.exit(EXIT_OK), but wait on promises too.
module.exports = apprVote;