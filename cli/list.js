const cfg = require('../cfg');
const dbg = require('../dbg');
const Fs = require('fs');
class list extends require('./Cmd') {
  constructor(...args){
    super(...args);    
    this.option('-p, --pepper','do you want it?');    
    this.action(function(cmd){
      // find everything
      console.log('dirrr',Fs.readdirSync(cfg.workdir,{encoding:'utf8'}));
 
    })
  }
}
module.exports = list;