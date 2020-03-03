
/**
 * @module approval-voting
 */
/**
 * 
 */
module.exports = {
  /**
   * @returns {lib}
   */
  get lib(){return require('./lib')}, 
  /**
   * @returns {cli}
   */
  get cli(){return require('./cli')},
  /** 
   * @returns {bin}
  */
  get bin(){    
    return require('./bin')
  },
  get cfg(){return require('./cfg') },
  get dbg(){return require('./dbg')}
};
