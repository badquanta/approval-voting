const Debug = require('debug');
let name = require('./name');
const dbg = module.exports = Debug(name);
dbg.warn = Debug(`${name}:WARNING`);
dbg.error = Debug(`${name}:ERROR`,{color:'red'})
dbg.verbose = Debug(`${name}:VERBOSE`);
Debug.enable(`${name},${name}:WARNING,${name}:ERROR`);


