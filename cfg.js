const data = {
}
const dbg = require('./dbg');
const MIN_VERBOSITY_VERBOSE = 2;
const {lib} = require('./');
/**
 * Represents runtime-configuration. 
 * Is writable; will clean & validate values.
 * Can "try" to import data from many different sources;
 * gracefully ignoring failures. Overwrites values from each
 * successive successful source over previous values also defined.
 * By default this base class will load: 
 * 1) the cfg.json located within this repository.
 * 2) the user's $HOME/.approval-voting.json file; overriding settings set in both places.
 * 3) the current working directory's approval-voting.json settings.
 */
class Cfg {
  /** Minimum verbosity level considered to be "verbose." */
  get MIN_VERBOSITY_VERBOSE(){return MIN_VERBOSITY_VERBOSE}
  /** The working directory of this repository: the default in version 0.0.0 is the current working directory's "approvals" folder.
  */
  get workdir() {
    return new lib.WorkDir(data.workdir);
  }
  /** Through environment variables, command line flags, or other means one may choose another path to work with; and polling always
   * works with a different directory cloned from this original value.
   */
  set workdir(path){
    return data.workdir=path;
  }
  /** @todo upstream should point to the pull and push destination for "batch-syncs"; not yet implemented */
  get upstream() {
    return data.upstream;
  }
  /** 
   * verbosity of output setting level; an integer. 
   * 0) or less, representing quiet. 
   * 1) represting general info and major steps.
   * 2) being considered the start of verbose and extra or redundant information.
   * 3) or more being considered info useful only for low-level debugging and troubleshooting.
   **/
  get verbosity() {
    return data.verbosity || 0;
  }
  /**
   * Change the current verbosity level; should have an immediate affect on logs & output.
   */
  set verbosity(lvl) {
    return data.verbosity = lvl;
  }
  /**
   * Test if the verbosity level is set to or above the "minimum verbosity level", a.k.a. `2`
   */
  get verbose() {
    return this.verbosity >= MIN_VERBOSITY_VERBOSE
  }
  /**
   * Ensure the verbosity level is set to or above (or below) the "minimum verbosity level", a.k.a. `2`.
   * @param {boolean} enabled if true then when the current verbosity is below "verbose", it will set it to "verbose."
   * inversly when `false` and the current verbosity is above "verbose", it will set it to "verbose"-1 (a.k.a. `1`)
   */
  set verbose(bool=true) {
    if (!this.verbose && bool) {
      this.verbosity = MIN_VERBOSITY_VERBOSE;      
    } else if(this.verbose && !bool){
      this.verbosity = MIN_VERBOSITY_VERBOSE-1;
    }
    return this.verbose == bool;
  }
  /**
   * The program considers input containing this character to be more than one individual value.
   * It will split up that individual value into multiples; trimming whitespace around each split value.
   */
  get separator() {
    return data.separator;
  }
  /**
   * The user can specify via command line; environment variables; or settings either different character(s)
   * to use for separation; or disable separation all together.
   */
  set separator(chars) {
    return data.separator = chars;
  }
  /**
   * The user can specify via command line; environment variables; or settings different "algorithims" used to 
   * compute "ObjectHashes".
   */
  get algorithim() {
    return data.algorithim;
  }  
  set algorithim(alg) {
    return data.algorithim = alg;
  }
  get json() {
    return JSON.stringify(data, null, 2);
  }
  tryLoadFrom(path) {
    try {
      let more = require(path);
      dbg.verbose('configuration loaded from path:', path, more);
      Object.assign(cfg, more);
    } catch (e) {
      //dbg.verbose(e);
      dbg.verbose('no configuration at', path);
      return false;
    }
    return cfg;
  }
}
const cfg = module.exports = new Cfg;
cfg.tryLoadFrom('./cfg.json')
cfg.tryLoadFrom(`${process.env.HOME}/.approval-voting.json`)