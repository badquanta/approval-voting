const Debug = require('debug');
let name = require('./lib/name');
const dbg = module.exports = Debug(name);
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


