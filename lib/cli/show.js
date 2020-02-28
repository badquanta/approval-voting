const Question = require('../Question')
const dbg = require('../dbg');
require('./cli')
  .command('show')
  .option('-i, --id <IDs...>',
  `you may specify one or more "ids" to display. If none; defaults to all loaded.`,
  function collectIds(value, previous){
    if(!previous){
      previous=[];
    }
    previous.push(value);
    return previous;
  },
  undefined
  )
  .action(showIDs);
function showIDs(options) {
  var IDs = options.id || Question.loadedIDs;
  var questions = [];
  if (IDs.length > 0) {
    dbg("Got IDs", IDs);
    return;
  } else {
    dbg("No IDs", Question.loaded);
    questions = Question.loaded;
  }
}