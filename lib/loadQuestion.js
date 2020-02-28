module.exports = loadQuestion;
const dbg = require('./dbg');
function loadQuestion(path){
  try {
    question = Question.load(path);
  } catch (e){
    dbg.error('loadQuestion',e);
    require('./quit')(e);
  }
}