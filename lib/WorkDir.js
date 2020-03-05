//node's filesystem api

//node's utility library 
const index = require('../');
const {MkDirP, RimRaf, Path, Fs} = index.ext;
const {dbg} = index;
/**
 * A "WorkDir" is the directory in which approval voting maintains its files.
 * Within "WorkDir" should be a repository that follows some basic rules:
 * @todo Issue#3 define those basic rules. 
 * @link https://github.com/badquanta/approval-voting/issues/3
 */
class WorkDir {
  
  constructor(path){
    dbg('WorkDir path: ',path);
    this.path=Path.resolve(path);
  }
  /**
   * Simply checks to see if this path exists.
   * @returns {Promise} resolves to true if it does; false if it does not.
   * 
   */
  async checkExists(){
    //return Fs.promises.exists(this.path);
    return Fs.promises.stat(this.path).then((stats)=>{
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
      return Fs.promises.access(this.path, Fs.constants.R_OK | Fs.constants.W_OK);
    }).then(()=>{
      // TODO: Issue#3 We should make sure we have or init a git repo.
      // https://github.com/badquanta/approval-voting/issues/3
      return Promise.resolve(true);
    });
  }
  /**
   * the inverse of ensureExists; this will recursively remove the directory (very distructive; be careful.)
   * @todo again maybe an optional path parameter.
   * @todo maybe require a --yes option || prompt to confirm?
   */
  async ensureRemoved(){
    return this.checkExists().then((doesExist)=>{
      console.log('ensureRemoved does exist?',doesExist)
      if(doesExist){        
        return RimRaf(this.path,(err)=>{
          dbg.error('rimraf err',err);
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
   * @returns {Promise<Array<String>>}
   */
  async list(path='.'){
    return this.checkExists().then((doesExist)=>{
      if(doesExist){
        return Fs.promises.readdir(Path.resolve(this.path,path));
      } else {
        return Promise.resolve([]);
      }
    })
  }
  /**
   * @param {String} path local path to look for questions; defaults to '.' which is the same as `${this.path}/.` equivelant as just this.path's value.
   */
  async listQuestions(path='.'){
    return this.list(path).then((listing)=>{
      return Promise.resolve(listing.filter((item)=>{
        return /[0-9a-zA-Z]+\.json/.test(item) != false;
      }));
    });
  }
  /**
   * simply write the contents specified to a (relative) path.
   * @todo Issue#3 reject absolute paths 
   * @link https://github.com/badquanta/approval-voting/issues/3
   */
  async write(file, data) {
    return Fs.promises.writeFile(
      Path.resolve(this.path,file),
      data,
      {encoding: 'utf8'}
    );
  }
  /**
   * @todo this is not an async function; it just pretends to be; fix that.
   * If any of the paths fail to load; this entire promise will reject.
   * Failing to load includes failing to pass the hash-check; even if the data could be read.
   * It used to throw an exception; I may make that occur again in another way.
   * @param  {...any} questionPaths any number of question paths you'd like to load...
   * @returns {Promise<Array<Question>>} if this is able to load all of the paths; it will return an array of questions.
   * 
   */
  async readQuestions(...questionPaths){
    dbg('read questions:',...questionPaths);
    let paths = [...questionPaths]
    return Promise.all(paths.map((path)=>{
      // TODO: DO NOT LET THIS STICK AROUND TO PRODUCTION CODE
      // lazy way of parsing json; also fails miserably if
      // the file doesn't exist or has a bad format.
      var json = require(Path.resolve(this.path,path));
      dbg('json:',json);
      var q = new index.lib.Question(json.text,json.description,json.winners,...json.choices);
      var hash = q.getHash();
      if(path.indexOf(hash)!==-1){
        return Promise.resolve(q);
      } else {
        return Promise.reject('Loaded data does not match path hash.');
      }
    }));
  }
/**
 * @module approval-voting/lib
 * @export WorkDir
 */}
module.exports = WorkDir;