/** @module approval-voting/cli */
const cfg = require('../cfg');
const dbg = require('../dbg');
const Fs = require('fs');
const {Question} = require('../lib');
/**
 * 
 */
class list extends require('./Cmd') {
  constructor(...args){
    super(...args);
    this.arguments('');
    this.option('-f, --fields <field...>', 'pick one or more comma separated fields to list with the HASH ids.', function collectShownFields(nv,pv){
      return pv.concat(...nv.split([',',' ','"','\'']).map((e)=>new RegExp(e.trim())));
    },[]);
    this.action(function(cmd){
      // find everything
      let ls = Fs.readdirSync(cfg.workdir,{encoding:'utf8'}).map((e)=>cfg.workdir+'/'+e).reduce(function(m,e){
        var data = Question.load(e);
        m[e] = {};
        Object.keys(data.data).forEach((field)=>{
          cmd.fields.forEach((shownField)=>{
            if(shownField.test(field)){
              m[e][field]=data.data[field];
            }
          })
        })

        return m;
      },{});
      console.debug(ls);
    })
  }
}
module.exports = list;