/**
 * Show, Don't yell.
 * Use this to show the source of the currently running file.
 */
module.exports = showDontYell;
const SHOW_FILE_START_LINES=1;
const LINE_NUMBER_PADDING=9;
const Path = require('path');
const Fs = require('fs');
/** this magic incantation was discovered on the following ancient scroll:
 * @link https://stackoverflow.com/questions/14172455/get-name-and-line-of-calling-function-in-node-js
 */
function getStack() {
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}

Object.defineProperty(global, '__function', {
  get: function () {
    return __stack[1].getFunctionName();
  }
});
var trail = [];
var files = {};
function foo() {
  showDontYell();
}
foo()

function getFile(aFile){
  resolved = require.resolve(aFile);
  if(!require.cache[resolved]){
    console.warn(`FISHY: this file has yet to be loaded by node.js require`);
  }
  if(!files[resolved]){
    console.info(`Reading ${resolved}`);
    files[resolved] = Fs.readFileSync(resolved,{encoding:'utf8'}).split('\n');
  }
  return files[resolved];
}
function showLines(aFile, aStartLine=0, aCount=1) {
  var file = getFile(aFile);
  for(let i=aStartLine; (i<=aCount)&&(i<=file.length);i++){
    console.log(
      `${Path.basename(aFile)}:${String(i).padStart(LINE_NUMBER_PADDING, '0')}`,file[i])
  }
}
function showFile(aFile){
  console.log(`TODO: Switch to file ${aFile}`);
  showLines(aFile,0,SHOW_FILE_START_LINES);  
}

function showLine(aFile, aLine) {
  showLines(aFile,aLine);
}
var lastFunction = undefined;
var lastFile = undefined;
var lastLine = undefined;
function showDontYell() {
  var aStack = getStack();  
  var aLine = aStack[1].getLineNumber();
  var aFunction = aStack[1].getFunctionName();
  var aFile = aStack[1].getFileName();
  var aThis = aStack[1].getThis();
  var aMethod = aStack[1].getMethodName();
  var aPosition = aStack[1].getPosition();
  var aColumnNumber = aStack[1].getColumnNumber();
  var aEvalOrigin = aStack[1].getEvalOrigin();
  var aScriptNameOrSourceUrl = aStack[1].getScriptNameOrSourceURL();
  var aTypeName= aStack[1].getTypeName();
  var callsite = {
    aScriptNameOrSourceUrl,aFile,aPosition,aLine,aColumnNumber,
    aEvalOrigin,aTypeName,aThis,aMethod, aFunction
  }
  console.log(callsite);

  if (lastLine == aLine && !aFunction && !aFile) {
    console.warn("Why called for the same line?")
  }
  if (aFunction != undefined && aFunction != lastFunction) {
    if (lastFunction != undefined) {
      console.log(`Old Function ${lastFunction}`);
    }
    lastFunction = aFunction;
    if (lastFunction != undefined) {
      console.log(`New Function ${lastFunction}`);
    }
  }
  if (aFile != undefined && aFile != lastFile) {
    showFile(aFile);
    lastFile = aFile;
  }
  let point = { line: lastLine, func: lastFunction, file: lastFile }
  if (trail.length <0 || trail[trail.length - 1] != point) {
    trail.push(point);
  } else {
    console.debug(`Last Point: trail[${trail.length-1}]`,trail[trail.length-1]);
    console.debug("This Point:",point);
    console.error("Same point twice in a row, missing something...");
  }
  showLine(aFile, aLine);
}
