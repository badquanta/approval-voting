
/** Depends on... */
const Fs = require('fs');
const Question = require('./Question');
const cfg = require('./approval-voting.json');
const dbg = require('./dbg');
/**
 * Create a new Question.  The first parameter is expected to be a string:
 * if it is valid JSON; it is interpreted as such and it's properties are used.
 * if it is any other string; or the JSON is interpreted into a string; 
 * then this string is used as the `text` of the question.
 * @param {String} textORjson 
 * @param {String} description 
 * @param {object} options
 * @param {boolean} options.force
 * @param {number} options.winners defaults to 1
 */
function createQuestion(textORjson, description, options,...args) {
  //showDontYell();
  var question;
  question = Question.clean(textORjson);
  if (description) {
    question.description =
      question.description ?
        `${question.description} ${description}`
        :
        description;
  }
  if ((question.winners && options.winners) && (question.winners != options.winners)) {
    throw new Error(
      `Number of Winners contra-specified. Pick either: ${question.winners} or ${winners}`
    );
  } else { question.winners = options.winners; }
  
  question.addChoices(...options.choice||[]);
  let choices = question.getChoices();
  
  for (let idx = 0; idx < choices.length; idx++) {
    dbg(`Choice #${idx + 1}: "${choices[idx].text}"`);
  }
  require('./ensureBaseDirSync')(cfg.basedir);
  questionPath = `${cfg.basedir}/${question.generateId()}.json`
  
  
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
}
module.exports = createQuestion;