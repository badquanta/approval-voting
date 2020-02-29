
/**
 * Approval voting commands:
 */
class bin extends require('./lib') {
  static get cmd(){return require('./bin/aVote')}
  static get question(){return require('./bin/aVote-question')}
  static get show(){return require('./bin/aVote-show')}
  static get poll(){return require('./bin/aVote-poll')}
}
module.exports = bin;