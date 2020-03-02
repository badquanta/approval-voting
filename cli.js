/** 
 * this module is a require-on-demand index of the
 * c.l.i. library of classes.
 * @module approval-voting/cli 
 * */
module.exports = {
  get Cmd() { return require('./cli/Cmd') },
  get poll() { return require('./cli/poll') },
  get question() { return require('./cli/question') },
  get show() { return require('./cli/show') },
  get list() { return require('./cli/list') },
  get config() { return require('./cli/config') }
}
