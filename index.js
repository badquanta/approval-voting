
/**
 * index.js provides require-on-demand access to components
 * of the library via exported properties.
 * 
 */
module.exports = {
  /** core library logic classes 
   
  */
  get lib(){return require('./lib')}, 
  /**
   *  command line interface classes 
   **/
  get cli(){return require('./cli')},
  /** executables shell scripts */
  get bin(){return require('./bin');},
  /** config */
  get cfg(){return require('./cfg');},
  /** debug */
  get dbg(){return require('./dbg');},
  /** externals */
  get ext(){return require('./ext');},
  /** package(json) */
  get pkg(){return require('./package.json');}
};
