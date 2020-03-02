/**
 * This library should define the user-interface agnostic "business-logic" of
 * this implementation of approval-voting.
 * @module approval-voting/lib
 **/
module.exports= {  
  /** @type {approval-voting/lib~Question} */
  get Question(){return require('./lib/Question')},
  /** @exports */
  get Ballot(){return require('./lib/Ballot')},
  /** @exports */
  get WorkDir(){return require('./lib/WorkDir')}
}