/**
 * remove the existing `basedir`
 * @todo make async
 */
function removeBaseDirSync(basedir) {
  dbg.warn(`Force enabled, unable to write directory so removing: rm -rf ${basedir}`);
  let rimraf = require('rimraf');
  rimraf.sync(basedir);
}