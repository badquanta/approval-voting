const Question = require('../Question');
const dbg = require('../dbg');
const cfg = require('../approval-voting.json');
/** `apprVote.js` CLI -- COMMAND "new" */
require('./cli')
  .command('question <question_text_json>')
  .description(
    `create a new question`
  )
  /** @param flags
   * @param description
   * @param {default_value or function}... 
   ***/
  .option('-w, --winners <number>',
    `usually 1, or most common choice of all. Can be more than one.`,
    '1')
  .option('-d, --description <text>',
    `explanation of question text; looser content rules.`,
    function appendDescriptionOption(value, prev) {
      return prev ?
        prev + '\t' + value
        :
        value;
    },
    ''
  )
  .option('-c, --choice <text>',
    `One of the options to approve; at least two REQUIRED.  
    You may list more than one per -c flag, example: -c "choice1, choice2, choice3"
    The command line interface will split any values specified by '--separator <chars>'.
    This feature can be turned off with '--no-separator'`,
    function collectChoices(value, prev) {
      var separated = cfg.separator ? value.split(cfg.separator) : [value]
      return prev.concat(separated);
    },
    []
  )
  .option('--separator <chars>',
    `see: '-c, --choice <text>'. Allows the user to specify a different separator.`,
    function setSeparator(chars){
      dbg.verbose('--separator',chars);
      cfg.separator = chars;
    },
    ','
  )
  .option('--no-separator', 
    `allows the user to disable choice separation, which means each choice must be separated manually with '-c' or '--choice' flags.`,
    function noSeparator(){
      dbg.verbose('--no-separator');
      cfg.separator = false;
    }
  )
  .option('-t, --ties <resolver>',
    `Defaults to reVote50; with bottom 50% of choices removed from last results.`,
    'reVote50')
  /**  this will require & call the create function**/
  .action(
    function cliQuestion(text, cmd) {
      dbg('Creating new question:', text, cmd.description, cmd.winners, cmd.choice)
      dbg('Created:', Question.create(text, cmd.description, cmd.winners, ...cmd.choice));
    }
  )