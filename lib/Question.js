// @private deps.
const index = require('../'); 
const {ObjectHash, Path} = index.ext;
const {dbg,cfg} = index;
/**
 * So, a question in "Approval Voting" is basically just some text associated
 * with a set of possible choices. 
 * @note about question's text
 * Version 0.0.1 says the "text" of the question may only contain 
 * spaces. It is not case-sensitive, so the same text but different cases
 * will be considered a clash.
 * 
 * Questions have more than two choices; but there is no upper limit.
 * 
 * Questions have at least one winner; and have at least one more choice
 * than the number of "winners."
 * 
 * A question has yet to be answered.  For that; one needs a `Poll`
 */
class Question {
  /** Questions can be loaded from `json` files. */
  static load(file){
    dbg(`Question.load`,file)
    var data = require(Path.resolve(file));
    dbg.verbose('loaded data:',data);
    var q = new Question(data.text, data.description, data.winners, ...data.choices||[]);
    var id = q.getHash();
    if(file.indexOf(id)!==-1){
      return q;
    } else {
      throw new Error(`The generated ID did not match the file name:\nID="${id}"\nFilename="${file}"`);
    }
  }
  /** saves the question to the basedir */
  static async create(text,desc,winners,...choices){
    dbg.verbose('create:',text,desc,winners,choices);
    // Ok; just need an instance:
    var inst = new Question(text,desc,winners,...choices);
    // That will throw an error; which we don't handle
    // if something is wrong with the params, otherwise
    // we know we got a good "Question".
    await cfg.workdir.ensureExists();
    var file = `${inst.getHash()}.json`;
    var json = inst.json;
    await cfg.workdir.write(file, json);
    dbg.verbose(`Question.create(): wrote to: ${file} contents:\n${json}`);
    return inst;
  }

  static resetLoaded(){
    Question.loaded = [];
    Question.loadedIDs = {};
  }

  /**
   * At a minimum; a question needs: `text`, `winners` number, `choices` array.
   * 
   * @param {*} text 
   * @param {*} winners 
   * @param  {string|object} choices Expected to generally just be a string/text representing that choice. May also be an object; must have the property `text`.
   */
  constructor(text, description, winners = 1, ...choices){
    dbg("new Question('%s',`%d`, %d, ...choices x%d)",text,description,winners,choices.length)
    this.data = {
    //make sure to take out any surrounding ""
      text: text.replace(/[\s"]+/g,' ')
       .replace(/\s\s+/g,' ')
       .replace(/^\s+|\s+$/g, ''),
      description: description,
      winners: (typeof winners != 'number') ?
        parseInt(winners) :
        winners,
      choices: choices.map((choice,idx)=>{
        dbg("Cleaning Choice[%d]",idx,choice)
        if(!choice)return;
        var clean = choice.replace(/\s/g,' ').replace(/\s\s/g,' ');
        return clean;
      }).sort()
    };
    dbg.verbose(`New Question Data (clean):`,this.data);    
    Object.freeze(this.data);
    Object.freeze(this);

    let reasons;
    if((reasons = this.isInvalid())) throw new Error(`Invalid Question: ${reasons}`);
    let hash=this.getHash();
    if(Question.loaded[hash]!=undefined) throw new Error("ID clash.");
    let idx=Question.loaded.push(this);    
    Question.loadedIDs[idx]=this;
    dbg('new question@%d hash "%s"',idx,hash)
  }
  get text(){
    return this.data.text;
  }
  get description(){
    return this.data.description;
  }
  get winners(){
    return this.data.winners;
  }
  get choices(){
    return this.data.choices.slice(0);
  }
  get json(){
    return JSON.stringify(this.data, null, 2);
  }
  get hash(){
    return this.getHash();
  }
  get idx(){
    var idx = Question.loadedIDs[this.hash];
    return idx ? idx : undefined;
  }
  /**
   * Generate a question ID.
   * @param {*} text 
   */
  getHash(){  
    return ObjectHash(this.data,{algorithm:cfg.algorithm});
  }
  /**
   * Both this function & the `choices` property returns a copy of the
   * `choices array` (so that the original is protected), @note this version
   * will always return the array in random order; the property returns the original order.
   */
  getChoices(){
    var copy = this.choices.slice(0,this.choices.length);    
    return copy.sort((a, b)=> 0.5 - Math.random());
  }
  /**
   * If this question is invalid in any way;
   * this will return a description why.
   */
  isInvalid(reason_separator=', '){
    var reasons = [];    
    if(this.winners>=this.choices.length){
      reasons.push(`Approval voting requires more choices (${this.choices.length}) than winners (${this.winners})`);
    }

    if(reasons.length==0)
      return undefined;
    else
      return reasons.join(reason_separator).trim();
  }
}
Question.resetLoaded();
module.exports = Question;