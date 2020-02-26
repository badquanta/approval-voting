class Question {
  static load(file){
    data = require(file);
    return new Question(data.text, data.winners, ...data.choices||[]);
  }
  static clean(json, winners=1,...choices){
    let data = undefined
    try {
      data = JSON.parse(json);
    } catch (e){
      data=undefined;
    }
    if((!data)||((typeof data==='string')||(data instanceof String))){
      return new Question(json, winners, ...choices);
    } else {      
        return new Question(data.text, data.winners||winners,...choices,...data.choices);
    }
  }
  initializer(text, winners = 1, ...choices){
    setText(text);
    addChoices(...choices);
    setWinners(winners);
    Question.all.push(this);
  }

  setText(text){
    //make sure to take out any surrounding ""
    this.text = text.replace(/^\s+"(.*)"\s+$/,(m,p1)=>p1);
  }

  addChoices(...choices){
    if(!this.choices){
      this.choices = [];
    }
    choices.forEach((choice)=>{
      this.choices.push(choice);
      this.choices.filter((choice,idx)=>{
        var clean = choice.replace(/^\s+"(.*)"\s+/g,(m,p1)=>p1)
        this.choices.push(clean);
      })
    })
  }

  setWinners(winners){
    var val = parseInt(winners);
    if(val<=1){
      throw new Error("Approval Voting requires Winners to be greater than zero.");
    }
    this.winners=val;
  }

  getChoices(){
    var copy = this.choices.slice(0,this.choices.length);    
    return copy.sort((a, b)=> 0.5 - Math.random())      
  }
}
Question.all=[];
module.exports = Question;