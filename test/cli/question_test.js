const cli = require('../../bin/apprVote');
const Assert = require('assert');
const Question = require('../../lib/Question');
describe('question <text>',function(){
  var args;
  beforeEach(function(){
    args = ['',''];
    Question.resetLoaded();
  });
  it('works with two choices:',function(){
    args.push('question','just two choices','-c','c1','-c','c2');
    cli.parse(args);
    Assert.equal(Question.loaded.length,1);
  });
  it('fails with just one choice:',function(){
    args.push('question','just one','-c','c1');
    Assert.throws(()=>{
      cli.parse(args);
    });
  });
});