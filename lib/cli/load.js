const dbg =require('../dbg');
const Question = require('../Question');
require('./cli')
  .command('load <file>')
  .description('load previously declared questions')
  .action(loadFile);
function loadFile(file,cmd){  
  dbg("Load File",file);
  var loaded = Question.load(file);
  require('./consumeArgs')(file);
  return loaded;
}