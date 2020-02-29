class cli {
  static get Cmd(){return require('./cli/Cmd')}
  static get poll(){return require('./cli/poll')}
  static get question(){return require('./cli/question')}
  static get show(){return require('./cli/show')}
  static get list(){return require('./cli/list')}
  static get config(){return require('./cli/config')}
}
module.exports = cli;