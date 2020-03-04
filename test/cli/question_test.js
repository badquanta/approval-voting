const question = require('../../cli/question');
var cli = undefined;
const index = require('./'); const {Assert} = index.ext;
const Question = require('../../lib/Question');
describe('question <text>',function(){
  var args;
  beforeEach(function(){
    args = ['',''];
    cli = new question;
    Question.resetLoaded();
  });
  it('works with two choices:',function(){
    args.push('just two choices','-c','c1','-c','c2');
    cli.parse(args);
    Assert.equal(Question.loaded.length,1);
  });
  it('fails with just one choice:',function(){
    args.push('just one','-c','c1');
    Assert.throws(()=>{
      cli.parse(args);
    });
  });
});