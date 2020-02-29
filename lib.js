class lib {
  static get Question(){return require('./lib/Question')}
  static get Ballot(){return require('./lib/Ballot')}
  static get cli(){return require('./cli');}
}
module.exports = lib;