/** 
/** */
const Question = require('../lib/Question');
/** */
const dbg = require('../dbg');
/** */
const cfg = require('../cfg');
/** `apprVote.js` CLI -- COMMAND "new" */
class question extends require('./Cmd') {
  constructor(...args) {
    super(...args);    
    this.arguments('<text>');
    this.description(
      `create a new question`
    )
    /**
     * @param flags
     * @param description
     * @param {function}... 
     ***/
    this.option('-w, --winners <number>',
      `usually 1, or most common choice of all. Can be more than one.`,
      '1')
    this.option('-d, --description <text>',
      `explanation of question text; looser content rules.`,
      function appendDescriptionOption(value, prev) {
        return prev ?
          prev + '\t' + value
          :
          value;
      },
      ''
    )
    this.option('-c, --choice <text>',
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
    this.option('--separator <chars>',
      `see: '-c, --choice <text>'. Allows the user to specify a different separator.`,
      function setSeparator(chars) {
        dbg.verbose('--separator', chars);
        cfg.separator = chars;
      },
      ','
    )
    this.option('--no-separator',
      `allows the user to disable choice separation, which means each choice must be separated manually with '-c' or '--choice' flags.`,
      function noSeparator() {
        dbg.verbose('--no-separator');
        cfg.separator = false;
      }
    )
    this.option('-t, --ties <resolver>',
      `Defaults to reVote50; with bottom 50% of choices removed from last results.`,
      'reVote50')
    /**  this will require & call the create function**/
    this.action(
      function cliQuestion(text, cmd) {
        dbg('Creating new question:', text, cmd.description, cmd.winners, cmd.choice)
        dbg('Created:', Question.create(text, cmd.description, cmd.winners, ...cmd.choice));
      }
    )
  }
}  
module.exports = question;