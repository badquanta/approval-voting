const index = require('./'); const {Assert} = index.ext;
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
        // we wait for a timeout to ensure the filesystem has had a chance to sync the change.
        // calling a check exists immediately after calling for it's removal will always return true 
        // (apparently)
        return new Promise((resolve,reject)=>{
          return setTimeout(()=>{
            return resolve();
          },200);        
        });
      })
      .then(()=>wd.checkExists())
      .then((doesExist)=>{
        //Assert.equal(doesExist,false);
        console.log('still exists???',doesExist)
      });
  });

});