const index = require('../');
const {dbg} = index;
/** @module approval-voting/cli */
/**
 * approval-voting/cli/
 */
class poll extends require('./Cmd'){
  constructor(...args){
    super(...args)
    this.description(`Start collecting ballots from voters`)
    this.action((...args)=>this.startPolling(...args));
  }
  /**
   * @todo: support specifying questions, or order.
   * 
   */
  startPolling(cmd){    
    dbg.info('Gathering polling questions...',cmd.args);    
    return index.cfg.workdir.listQuestions()
      .then((list)=>index.cfg.workdir.readQuestions(...list))
      .then((questions)=>{
        dbg.info('Ready to Ask %d questions.',questions.length);
        const ballot = new index.lib.Ballot(...questions);
        dbg.info('Constructed ballot:',ballot.getHash());
        // time to start reading input.. first off.. who's voting?
        return index.ext.Inquirer.prompt(
          [{type:'string',message:"What is your name?",name:"voter"}]
        ).then(({voter})=>{
          dbg.info("Got voter name:",voter);
          // so now we need to collect each question...
          return index.ext.Inquirer.prompt(
            questions.map((question, idx)=>{
              return {
                name: `${idx}`,
                type: 'checkbox',
                message: question.text,
                prefix: question.description,
                choices: question.getChoices()
              }
            })
          )
        });
      });
  }
}
module.exports = poll;