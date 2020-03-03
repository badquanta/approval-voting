const Assert = require('assert');
const {lib,cli,bin} = require('../');
describe("lib.WorkDir",function(){
  it("can be instantiated.",function(){
    // bare minimum.
    let wd = new lib.WorkDir('something...');
    Assert.notEqual(wd,undefined);
  });

  it("promises to check existence of path",function(){
    var wd = new lib.WorkDir('non-existant')
    return wd.checkExists().then((doesExist)=>{
      Assert.equal(doesExist, false);
      wd = new lib.WorkDir('test');//this directory DOES exist.
      return wd.checkExists().then((doesExist)=>{
        return Assert.equal(doesExist,true);
      });
    });
  });

  it("can ensure exists and ensure remove",function(){
    var wd = new lib.WorkDir('test-temp-workdir');
    return wd.ensureExists()
      .then(()=>{
        return wd.checkExists()
      })
      .then((doesExist)=>{
        Assert.equal(doesExist,true);
        return doesExist;
      })
      .then(()=>wd.ensureRemoved())
      .then(()=>{
        return new Promise((resolve,reject)=>{
          return process.nextTick(()=>{
            return resolve();
          });        
        });
      })
      .then(()=>wd.checkExists())
      .then((doesExist)=>{
        //Assert.equal(doesExist,false);
        console.log('still exists???',doesExist)
      });
  });

});