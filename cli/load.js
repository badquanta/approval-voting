const dbg =require('../dbg');
const Question = require('../lib/Question');
require('./Cmd')  
  .option('-l, --load <file>','load previously declared questions',loadFile)
function loadFile(file,cmd){  
  dbg("Load File",file);
  var loaded = Question.load(file);
  return loaded;
}