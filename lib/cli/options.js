const Debug = require('debug');
const dbg = require('../dbg');
const cmd = module.exports = require('./cli');
const cfg = require('../approval-voting.json');
/** `apprVote.js` CLI -- general options */
cmd
  /** Where to store data. */
  .option('-b, --basedir <path>', 'Specify the directory all files are created within.', (path) => cfg.basedir = path, 'approvals')
  /** How much to report to the user. */
  .option('-v, --verbosity [verbosity]', 'Specify `debug` pattern of output',
    // When specified on the command line, this function will be triggered.
    function (val) {
      dbg('--verbosity',val)
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
  .option('--verbose',
    `when specified, basicaly $DEBUG=* will take effect.`,
    /** This function will force npm's `debug` to output anything that uses it; including approval-voting */
    function () {
      dbg('--verbose');
      Debug.enable("*");
    }
  )//--verbose
  /** Disable any extra output; only errors OR results. */
  .option('-q, --quiet',
    `shen specified, basical $DEBUG='' will take effect.`,
    /** This function will force npm's `debug` to disable output of anything that uses it. */
    function () {
      dbg('--quiet')
      Debug.enable("");
    }
  )//-q/--quiet