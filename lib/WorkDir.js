//node's filesystem api
const Fs = require('fs').promises;
const FsConstants = require('fs').constants;
//node's utility library 
const Util = require('util');
//node's path string utilities.
const Path = require('path');
/**
 * @link https://www.npmjs.com/package/mkdirp
 */
const MkDirP = require('mkdirp');
const dbg = require('../dbg');
/**
 * A "WorkDir" is the directory in which approval voting maintains its files.
 * Within "WorkDir" should be a repository that follows some basic rules:
 * @todo define those basic rules.
 */
class WorkDir {
  
  constructor(path){
    this.path=Path.resolve(path);
  }
  /**
   * Simply checks to see if this path exists.
   * @returns {Promise} resolves to true if it does; false if it does not.
   * 
   */
  async checkExists(){
    //return Fs.exists(this.path);
    return Fs.stat(this.path).then((stats)=>{
      return Promise.resolve(stats!=null);
    }).catch((err)=>{
      dbg.warn(err);
      return Promise.resolve(false);
    });
  }
  /**
   * This will check to see if the path exists;
   * but if it doesn't it will attempt to create it.
   * Upon either path alredy existing;
   * Or successful creation of the folder(s)
   * it will resolve to {true.}  This should never
   * resolve to {false}; but rather `reject` the promise
   * if it cannot ensure this path exists and is writable.
   * @returns {Promise} allways resolves to `true` OR `reject()`s the `Promise`
   */
  async ensureExists(){
    return this.checkExists().then((doesExist)=>{
      if(doesExist){
        return Promise.resolve(true);
      } else {
        dbg.warn("Creating WorkDir at:",this.path);
        return MkDirP(this.path).then((value)=>{
          return Promise.resolve(value==this.path);
        });
      }
      //once we've ensured the directory does exist
      // double check we are allowed to write to that directory.
    }).then(()=>{
      return Fs.access(this.path, FsConstants.R_OK | FsConstants.W_OK);
    }).then(()=>{
      // TODO: We should make sure we have or init a git repo.
      Promise.resolve(true);
    });
  }
  /**
   * This will list the directory; or return an empty
   * list if the directory didn't exist.
   */
  async list(path='.'){
    return this.checkExists().then((doesExist)=>{
      if(doesExist){
        return Fs.readdir(Path.resolve(this.path,path));
      } else {
        return Promise.resolve([]);
      }
    })
  }
  /**
   * simply write the contents specified to a (relative) path.
   * @todo reject absolute paths
   * 
   */
  async write(file, data) {
    return Fs.writeFile(
      Path.resolve(this.path,file),
      data,
      {encoding: 'utf8'}
    );
  }
/**
 * @module approval-voting/lib
 * @export WorkDir
 */}
module.exports = WorkDir;