
const index = require('../'); 
const {cfg, dbg} = index;
const {Fs} = index.ext;
class config extends require('./Cmd') {
  constructor(...args){
    super(...args)    
    this.command('save [path.json]').description('save the active configuration json.').action(function(path){
      path = path || `${process.env.HOME}/.approval-voting.json`
      dbg('Saving configuration to',path);
      Fs.writeFileSync(path,cfg.json,'utf8');
      dbg('Saved to:',path)
    });
    this.command('show').description('print the current config').action(function(path){
      console.log('TODO: config',cfg.json);
    });
    this.action(this.outputHelp);
  }
}
module.exports = config;