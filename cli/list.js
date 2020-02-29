const cfg = require('../cfg');
const dbg = require('../dbg');
class list extends require('./Cmd') {
  constructor(...args){
    super(...args);
    this.option('-p, --pepper','do you want it?');
    this.action(function(cmd){
      dbg('list',cfg.json)
    })
  }
}
module.exports = list;