const dbg = require('../dbg');
module.exports = createBallot;
const Ballot = require('./Ballot');


function createBallot(options) {
  const RdLnIntr = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  RdLnIntr.question("Who is voting next?",
    function onNextVoter(voterId) {
      var checkIn = Voter.checkIn(voterId);
      let ballot = new Ballot(checkIn, Question.getAll());
      function askQuestion(question, aQidx) {
        let choices = question.getChoices();
        let choiceText = choices.map((choice, aCidx) => {
          return `${aCidx + 1}\t ${choice.text}\t\t${choice.description}`
        });
        let questionText
          = ```
            Collecting Ballot Entry For: 
            \t${voterId}
            
            Question #${aQidx} of ${ballot.questions.length}
            \t${question.text}

            \t\t${question.description}

            Choices:
            ${choiceText.join('\n')}

            Please Enter your choices:
            >```
        return new Promise(function (resolve, reject) {
          RdLnIntr.clean();
          RdLnIntr.question(
            `Which do you approve?
            `,
            collectBallotQuestion
          );//rl.question()
          function collectBallotQuestion(input) {
            dbg('input',input);
            createBallot();
          }
        })//new Promise(...)

      }
      return Promise.all(ballot.questions.map(askQuestion));
    }
  );
}