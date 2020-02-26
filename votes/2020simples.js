assert = require('assert');
apprVote = require('../apprVote');

describe('apprVote.js',function(){
    it('makes a new question',function(){
      apprVote.parse(testArgs)
      testArgs = [
        'new', 
        '"Who should be President?"', 
        '"Please select anyone you approve of for this role. Selecting everyone is the same as not voting; but proves you would have voted for someone, but either think none of them are worth it or all of them are."',
        '-c','"Bernie"',
        '-c','"Bloomberg"',
        '-v', '"Jon David Sawyer, David Mark Sawyer"',
        '-v', '"Bernie, Bloomber"'
      ]
    });
    assert.equal(apprVote.questions.length,1);
});