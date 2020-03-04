/** @module approval-voting/cli/Cmd */
// internal deps
const ApprovalVoting = require('../');
const {cfg, dbg, lib} = ApprovalVoting;
const {WorkDir} = lib;
// external deps
const Commander = require('commander');
const Debug = require('debug');
/**
 * Abstract base command for all the various commands.
 * @extends commander/Command
 * 
 */
class Cmd extends Commander.Command {
  /**
   * When mod equals process.mainModule; this will run the parse
   * function for `this` on `process.nextTick`
   * @param {Module} mod the module to test against process.mainModule
   */
  nextTickIfMain(mod) {
    dbg("nextTickIfMain")
    if (process.mainModule == mod) {
      dbg("nextTickIfMain process.mainModule is module.")
      process.nextTick(() => {
        dbg("nextTickIfMain->nextTick")
        process.setUncaughtExceptionCaptureCallback((err) => {
          console.error(err);
          process.exit(err);
        })
        process.on('uncaughtException', (err) => {
          console.error(err);
          process.exit(err);
        });
        process.on('unhandledRejection', (reason) => {
          console.error(reason);
          process.exit(reason);
        });
        this.parseAsync(process.argv);
        /** run actions **/
        //console.debug(this);
      });
    }
  }
 
  /**
   * This base class will define basic options like:
   * - `-w, --workdir <path>`
   * - `-v, --verbosity [number]`
   * - `--verbose`
   * - `-q, quiet`
   * @param  {...any} args these will get passe don to `Commander.js`.Command's constructor.
   */
  constructor(...args) {
    super(...args);
    /** Where to store data. */
    this.option('-b, --basedir <path>', 'Specify the directory all files are created within.', (path) => cfg.workdir = path, 'approvals')
    /** How much to report to the user. */
    this.option('-v, --verbosity [verbosity]', 'Specify `debug` pattern of output',
      // When specified on the command line, this function will be triggered.
      (val) => {
        dbg('--verbosity', val)
        if (val === null) {
          Debug.enable(`${NAME}*`);
          cfg.verbose = false;
        } else {
          Debug.enable(`${NAME}*, ${val}`);
          cfg.verbose = true;
        }
      },
      // When the user has not specified a level, the above function should recieve null as a default.
      null
    )
    /** Enable all reporting to user. */
    this.option('--verbose',
      `when specified, basicaly $DEBUG=* will take effect.`,
      /** This function will force npm's `debug` to output anything that uses it; including approval-voting */
      () => {
        dbg('--verbose');
        Debug.enable("*");
      }
    )//--verbose
    /** Disable any extra output; only errors OR results. */
    this.option('-q, --quiet',
      `shen specified, basical $DEBUG='' will take effect.`,
      /** This function will force npm's `debug` to disable output of anything that uses it. */
      () => {
        dbg('--quiet')
        Debug.enable("");
      }
    )//-q/--quiet    
  }
}
module.exports = Cmd;
