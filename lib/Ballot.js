/** @module approval-voting/lib */
/**
 * Obviously, @todo: @class Ballot
 * 
 * What is encoded in a ballot?
 * * The hash of all questions asked; combined.
 * * The ordered-hash of each question asked.
 * * The ordered-list of each set the voter chose to approve of each question.
 * * The inverse; but identically ordered list of each set the voter did not choose to approve of each question.
 * * Both sets (approve/not-approved) contain each option exactly once; no option may appear in both or may be missing from both.
 * * A hash of the voterID & pollsterID combined; but neither individually: verifiable/recomputable only if you know both already.
 * 
 * What may not be encoded; or inferred; from information on a ballot:
 * * The Voter ID.
 * * The pollster ID.
 * 
 */
class Ballot {
  /**
   * A ballot is a "live instance of this class" while each question is being answered and then encoded onto it.
   * A ballot is "cast" once that "live instance" is frozen; then and only then will it generate valid `json`.
   */
  constructor() {
    this.data = {
      questionsHash: undefined,
      questionsIds: [],
      choicesApproved: [],
      choicesNotApproved: []
    }
    throw new Error("TODO");
  }
  /**
   * Validate that `this.data` contains correct data.
   */
  validate(){
    // TODO validate ballots.
    return false;
  }
  /**
   * 
   */
  cast() {
    if(!this.validate()) throw new Error("Cannot cast invalid ballot.");
    Object.freeze(this.data.questionsIds);
    Object.freeze(this.data.choicesApproved);
    Object.freeze(this.data.choicesNotApproved);
    this.data.questionsHash = throw new Error("Computer hash of all questions...");
    Object.freeze(this.data);
  }
  /** This will @return `undefined` until `this` has been `cast()` */
  get json() {
    if (
      Object.isFrozen(this.data) &&
      Object.isFrozen(this.data.questionsIds) &&
      Object.isFrozen(this.data.choicesNotApproved) &&
      Object.isFrozen(this.data.choicesApproved)
    ) {
      return JSON.stringify(this.data, null, 2);
    } else {
      return undefined;
    }
  }
}
module.exports = Ballot;