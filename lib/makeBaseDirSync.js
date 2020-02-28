module.exports = makeBaseDirSync
/** Dependencies */
const MkDirP = require('mkdirp');
const dbg = require('./dbg');
/**
* create `basedir`
* as if you ran `mkdir -p $basedir`
* @todo make async
*/
function makeBaseDirSync(basedir) {
  dbg.warn('Creating basedir', basedir);
  MkDirP.sync(basedir);
}