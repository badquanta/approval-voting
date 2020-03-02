
/**
 * Approval voting commands:
 * @module approval-voting/bin
 */
module.exports = {
  get cmd(){return require('./bin/aVote')},
  get question(){return require('./bin/aVote-question')},
  get show(){return require('./bin/aVote-show')},
  get poll(){return require('./bin/aVote-poll')}
}