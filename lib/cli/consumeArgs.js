module.exports =consumeArgs;
const cli = require('./cli');
function consumeArgs(...args){
  args.forEach((consumedArg)=>{
    cli.args = cli.args.filter((cmdArg)=>{
      return cmdArg!=consumedArg;
    });
  });
}