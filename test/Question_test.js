const index = require('./'); const {Assert} = index.ext;
const {lib,cli,bin} = require('../');
describe("lib.Question",function(){
  it("can be instantiated.",function(){
    // bare minimum.
    let q = new lib.Question("text","desc",1,"a","b");
    Assert.notEqual(q,undefined);
  });

  it("can be created",function(){
    let q = lib.Question.create("text","desc",1,"a","b");
    Assert.notEqual(q,undefined);
  });

  it("identical questions generate same hash", function(){
    // even if choices are given in different orders.
    let q1 = new lib.Question('same text','same desc', 1, 'choice1','choice2')
    let q2 = new lib.Question('same text','same desc', 1, 'choice2','choice1')
    Assert.equal(q1.id, q2.id);
  });
});