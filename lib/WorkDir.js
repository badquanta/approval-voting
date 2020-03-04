//node's filesystem api
const Fs = require('fs').promises;
const FsConstants = require('fs').constants;
//node's utility library 
const index = require('./'); const {Util} = index.ext;
//node's path string utilities.
const index = require('./'); const {Path} = index.ext;
/**
 * @link https://www.npmjs.com/package/mkdirp
 */
const index = require('./'); const {MkDirP} = index.ext;
/** @link https://github.com/isaacs/rimraf */
const index = require('./'); const {Rimraf} = index.ext;
const dbg = require('../dbg');
/**
 * A "WorkDir" is the directory in which approval voting maintains its files.
 * Within "WorkDir" should be a repository that follows some basic rules:
 * @todo Issue#3 define those basic rules. 
 * @link https://github.com/badquanta/approval-voting/issues/3
 */
class WorkDir {
  
  constructor(path){
    dbg.info('WorkDir path: ',path);
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
      return Promise.resolve(stats.isDirectory());
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
   * @todo maybe an optional path parameter so one can use this function to create folders within this workdir too.
   * @returns {Promise} allways resolves to `true` OR `reject()`s the `Promise`
   */
  async ensureExists(){
    return this.checkExists().then((doesExist)=>{
      if(doesExist){
        return Promise.resolve(true);
      } else {
        dbg.warn("Creating WorkDir at:",this.path);
        return Promise.resolve(MkDirP(this.path)).then((value)=>{
          return Promise.resolve(value==this.path);
        });
      }
      //once we've ensured the directory does exist
      // double check we are allowed to write to that directory.
    }).then(()=>{
      return Fs.access(this.path, FsConstants.R_OK | FsConstants.W_OK);
    }).then(()=>{
      // TODO: Issue#3 We should make sure we have or init a git repo.
      // https://github.com/badquanta/approval-voting/issues/3
      return Promise.resolve(true);
    });
  }
  /**
   * the inverse of ensureExists; this will recursively remove the directory (very distructive; be careful.)
   * @todo again maybe an optional path parameter.
   */
  async ensureRemoved(){
    return this.checkExists().then((doesExist)=>{
      console.log('ensureRemoved does exist?',doesExist)
      if(doesExist){        
        return Rimraf(this.path,(err)=>{
          dbg.info('rimraf err',err);
          if(err) return Promise.reject(err);
          return Promise.resolve(true);
        });
      } else {
        return Promise.resolve(false);
      }
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
   * @todo Issue#3 reject absolute paths 
   * @link https://github.com/badquanta/approval-voting/issues/3
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