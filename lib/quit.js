module.exports = quit;
function quit(reason=undefined){
  if(!quit.flag){
    let dbg = require('./dbg');
    dbg.verbose('quit',reason);
    quit.flag=true;
  }
}
quit.flag = false;