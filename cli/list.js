/** @module approval-voting/cli */
const index = require('../'); 
const {Fs} = index.ext;
const {cfg,dbg} = index;
const { Question, WorkDir } = index.lib;
/**
 * 
 */
class list extends require('./Cmd') {
  constructor(...args) {
    super(...args);
    this.arguments('');
    this.option('-f, --fields <field...>', 'pick one or more comma separated fields to list with the HASH ids.', function collectShownFields(nv, pv) {
      return pv.concat(...nv.split(',').map((e) => new RegExp(e.trim())));
    }, []);
    this.action(async function (cmd) {
      dbg.info('getting workdir list...');
      // find everything
      return cfg.workdir.list().then((listing) => {
        dbg.info('got it...',listing.length);
        dbg.info('fields',cmd.fields);
        if(cmd.fields.length < 1){
          return listing;
        }
        return listing.map((e) => cfg.workdir.path + '/' + e).reduce(function (m, e) {
          var data = Question.load(e);
          m[e] = {};
          Object.keys(data.data).forEach((field) => {
            cmd.fields.forEach((shownField) => {
              if (shownField.test(field)) {
                m[e][field] = data.data[field];
              }
            })
          })
          return m;
        }, {});
      }).then((mapped) => {
        console.debug(mapped);
        return mapped;
      });
    });
  }
}
module.exports = list;