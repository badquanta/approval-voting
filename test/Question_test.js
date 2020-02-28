const Assert = require('assert');
const Question = require('../lib/Question');
describe("Question",function(){
  it("can be instantiated.",function(){
    // bare minimum.
    let q = new Question("text","desc",1,"a","b");
    Assert.notEqual(q,undefined);
  });

  it("can be created",function(){
    let q = Question.create("text","desc",1,"a","b");
    Assert.notEqual(q,undefined);
  })
});