module.exports = ensureBaseDirSync;
// Dependencies 
const dbg=require('../dbg');
const Fs=require('fs');
/**
 * ensure that the `basedir` both exists & is writable by us.
 * @param {string} basedir path
 * @param {boolean} force if true, will erase/overwrite.
 * @todo make async
 */
function ensureBaseDirSync(basedir, force=false) {
  dbg.verbose('ensure base dir', basedir)
  if (Fs.existsSync(basedir)) {
    dbg.verbose('basedir exists');
    let access = undefined;
    try{
       Fs.accessSync(basedir, Fs.constants.R_OK | Fs.constants.W_OK);
       access = true;
    } catch(e){
       access = false;
    }
    dbg.verbose('access rights on existing basedir?',access);
    if (access) {
      dbg.verbose('but we can write to it so that is ok.');
    } else {
      dbg.verbose('and we cannot write to it...')
      if (!force) {
        dbg.verbose('and we cannot do anything about it (missing -f/--force)');
        throw new Error(`Cannot write to basedir: ${basedir}`);
      } else {
        dbg.verbose('we can try to remove it...');
        require('./removeBaseDirSync')(basedir);
        dbg.verbose('and then create it...');
        require('./makeBaseDirSync')(basedir);
      }      
    }
  } else {
    dbg.verbose('basedir does not exist, attempting to create...');
    require('./makeBaseDirSync')(basedir);
  }
}