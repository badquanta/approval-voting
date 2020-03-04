
// internal deps:
const { lib, cli, dbg } = require('../');
const { Question, WorkDir } = lib;
const { Cmd } = cli;
/**
 * Command Line Interface sub-command: "show"
 */
class show extends Cmd {
  constructor(...args) {
    super(...args);
    dbg('cli/show.js');
    this.arguments('');
    //this.command('show')
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

  async showIDs(options) {
    return new Promise((resolve, reject) => {
      WorkDir.listQuestions()
        .then((list) => Question.loadAll(...list))
        .then((questions) => {
          questions.map(function showQuestion(q, qi) {
            return output = [
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
            ].map((r) => r.join('\t')).join('\n');
          });
          var output = questions.join('\n---\n');
          console.log(output);
          return Promise.resolve(output);
        });
    });
  }

}
/** @module approval-voting/cli */
module.exports = show;