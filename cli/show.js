
// internal deps:
const { lib, cli, dbg } = require('../');
const { Question } = lib;
const { Cmd } = cli;
/**
 * Command Line Interface sub-command: "show"
 */
class show extends Cmd {
  constructor(...args) {
    super(...args);
    dbg.verbose('cli/show.js');
    this.command('show')
    this.option('-i, --id <IDs...>',
      `you may specify one or more "ids" to display. If none; defaults to all loaded.`,
      function collectIds(value, previous) {
        if (!previous) {
          previous = [];
        }
        previous.push(value);
        return previous;
      },
      undefined
    )
    this.action(this.showIDs.bind(this));
  }

  showIDs(options) {
    dbg('hello');
    var IDs = options.id || Question.loadedIDs;
    var questions = [];
    if (IDs.length > 0) {
      dbg("Got %d IDs", IDs.length);
      return;
    } else {
      dbg("%d IDs loaded", Question.loaded.length);
      questions = Question.loaded;
    }

    questions.forEach(function showQuestion(q, qi) {
      console.log([
        [`# QUESTION:`, `${qi + 1}`, `OF`, `${questions.length}.`],
        [],
        [`## TEXT:`],
        ['', `"${q.text}"`],
        [],
        [`## DESCRIPTION:`],
        ['', `${q.description ? q.description : "<UNDEFINED>"}`],
        [],
        [`## CHOICES:`],
        ...q.choices.map((c, i) =>
          [`### ${i} )`, '', `${c}`]
        )
      ].map((r) => r.join('\t')).join('\n'));
    });
  }
}
/** @module approval-voting/cli */
module.exports = show;