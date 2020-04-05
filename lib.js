/**
 * This library should define the user-interface agnostic "business-logic" of
 * this implementation of approval-voting.
 * 
 **/
module.exports= {  
  /** */
  get Question(){return require('./lib/Question')},
  /**  */
  get Ballot(){return require('./lib/Ballot')},
  /**  */
  get WorkDir(){return require('./lib/WorkDir')}
}