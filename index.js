
const approval_voting = module.exports = {
  get lib(){return require('./lib')}, 
  get cli(){return require('./cli')},
  bin(mod){    

    return require('./bin')
  }
};
