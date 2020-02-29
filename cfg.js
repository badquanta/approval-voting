const data = {
}
const dbg = require('./dbg');
const MIN_VERBOSITY_VERBOSE = 2;

const cfg = module.exports = {
  MIN_VERBOSITY_VERBOSE,
  get workdir() {
    return data.workdir;
  },
  set workdir(path){
    return data.workdir=path;
  },
  get upstream() {
    return data.upstream;
  },
  get verbosity() {
    return data.verbosity || 0;
  },
  set verbosity(lvl) {
    return data.verbosity = lvl;
  },
  get verbose() {
    return this.verbosity >= MIN_VERBOSITY_VERBOSE
  },
  set verbose(bool) {
    if (!this.verbose && bool) {
      this.verbosity = MIN_VERBOSITY_VERBOSE;
    } else if(this.verbose && !bool){
      this.verbosity = MIN_VERBOSITY_VERBOSE-1;
    }
  },
  get separator() {
    return data.separator;
  },
  set separator(chars) {
    return data.separator = chars;
  },
  get algorithim() {
    return data.algorithim;
  },
  set algorithim(alg) {
    return data.algorithim = alg;
  },
  get json() {
    return JSON.stringify(data, null, 2);
  },

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
cfg.tryLoadFrom('./cfg.json')
cfg.tryLoadFrom(`${process.env.HOME}/.approval-voting.json`)