/**
 * So, a question in "Approval Voting" is basically just some text.
 * 
 * @note Version 0.0.1 says the "text" of the question may only contain 
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
const dbg = require('./dbg');
const ObjectHash = require('object-hash');
class Question {
  /** Questions can be loaded from `json` files. */
  static load(file){
    dbg(`Loading Question from ${file}`)
    data = require(file);
    return new Question(data.text, data.winners, ...data.choices||[]);
  }
  /** Questions should be able to be given as either strings or JSON, and data will be cleaned/appended/uniqued/etc. **/
  static clean(json, winners=1,...choices){
    dbg(`Cleaning Question from ${json}\n with winners=${winners} & choices = [${choices.join('\n,')}]`)
    let data = undefined
    try {
      data = JSON.parse(json);
    } catch (e){
      data=undefined;
    }
    dbg(`Parsed ${json} as \`${data}\``)
    if((!data)||((typeof data==='string')||(data instanceof String))){
      return new Question(json, winners, ...choices);
    } else {      
        return new Question(data.text, data.winners||winners,...choices,...data.choices);
    }
  }

  /**
   * At a minimum; a question needs: `text`, `winners` number, `choices` array.
   * 
   * @param {*} text 
   * @param {*} winners 
   * @param  {...{string|object}} choices Expected to generally just be a string/text representing that choice. May also be an object; must have the property `text`.
   */
  constructor(text, winners = 1, ...choices){
    this.setText(text);
    this.addChoices(...choices);
    this.setWinners(winners);
    Question.all[this.generateId()]=this;
  }

  /**
   * Generate a question ID.
   * @param {*} text 
   */
  generateId(){  
    return ObjectHash(this);
  }
  /**
   * A question REQUIRES text not to be empty.
   * All text will have whitespace simplified to legal characters with one-space
   * between them.
   * @todo Completely clean text of all illegal characters.with single space characters (S.S.C.)
   * @note 1. swaps all `/[\s"]+/g` with S.S.C.
   * @note 2. swaps all `/\s\s+/g` with S.S.C.
   * @note 3. swaps all starting and ending S.S.C. within nothing.
   * @param {*} text to be cleaned.
   */
  setText(text){    
    //make sure to take out any surrounding ""
    this.text = 
      text.replace(/[\s"]+/g,' ')
      .replace(/\s\s+/g,' ')
      .replace(/^\s+|\s+$/g, '');
    dbg(`Set question text to: ${this.text}`)
  }

  addChoices(...choices){
    if(!this.choices){
      this.choices = [];
    }
    choices.forEach((choice)=>{      
      if(!choice)return;
      var clean = choice.replace(/\s/g,' ').replace(/\s\s/g,' ');
      dbg(`Adding choice to question: ${this.text}`,clean)
      this.choices.push(clean);
    })
  }

  setWinners(winners){
    var val = parseInt(winners);
    if(val < 1){
      throw new Error("Approval Voting requires Winners to be greater than zero.");
    }    
    this.winners=val;
  }

  getChoices(){
    var copy = this.choices.slice(0,this.choices.length);    
    return copy.sort((a, b)=> 0.5 - Math.random())      
  }

  isValid(){
    if(this.winners<this.choices.length){
      return true;// I guess?
    }
  }
}
Question.all=[];
module.exports = Question;