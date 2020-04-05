// todo: idea count calls for each in state-signing-hashes.
/**
 * 
 */
module.exports = {
  // the following are native node libraries:
  // TODO: on node.js dependency bump; review these links.
  /**
   * @link https://nodejs.org/docs/latest-v10.x/api/fs.html
   */
  get Fs()      {return require('fs');},
  /**
   * @link https://nodejs.org/docs/latest-v10.x/api/util.html
   **/
  get Util()    {return require('util');},
  /**
   * @link https://nodejs.org/docs/latest-v10.x/api/path.html
   **/
  get Path()    {return require('path');},
  // the following are N.P.M. packages that must be installed:
  /**
   * @link https://www.npmjs.com/package/commander
   */
  get Commander(){return require('commander');},
  /**
   * @link https://www.npmjs.com/package/debug
   */
  get Debug()   {return require('debug');},
  /**
   * @link https://www.npmjs.com/package/object-hash
   */
  get ObjectHash() {return require('object-hash');},
  /**
   * @link https://www.npmjs.com/package/mkdirp
   */
  get MkDirP()  {return require('mkdirp');},
  /**
   * @link https://www.npmjs.com/package/rimraf
   */
  get RimRaf()  {return require('rimraf');},
  /**
   * @link https://www.npmjs.com/package/inquirer
   */
  get Inquirer() {return require('inquirer');}
}