const index = require('./');
const {Debug} = index.ext;
const {name} = index.pkg.name;
/**
 * Using the `debug` module, this defines
 * the root of approval-voting logging.
 * @todo may move away from debug
 */

const dbg = module.exports = Debug(index.pkg.name);
dbg.warn = Debug(`${name}:WARNING`);
dbg.warn.color = 1;
dbg.error = Debug(`${name}:ERROR`,{color:'red'})
dbg.error.color= 1;

dbg.verbose = Debug(`${name}:VERBOSE`,{color:'grey'});
dbg.verbose.color=2;
dbg.info = Debug(`${name}:INFO`);
dbg.info.color = 0;
if(!process.env.DEBUG)
Debug.enable(`${name},${name}:WARNING,${name}:ERROR,${name}:INFO`);


