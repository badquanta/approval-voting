/** @module approval-voting/cli */
/**
 * approval-voting/cli/
 */
class poll extends require('./Cmd'){
  constructor(...args){
    super(...args)
    this.description(`Start collecting ballots from voters`)
    this.action(()=>this.startPolling());
  }
  startPolling(){
    
  }
}
module.exports = poll;