
/** `apprVote.js` CLI -- COMMAND "start" */
module.exports=require('./cli')
  .command('start')
  .description(
    `Start collecting ballots from voters on a question:`
  )
  .action(require('../createBallot'));