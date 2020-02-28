module.exports = collection;
function collection(named){
  collection.all[named] = [];
  return function(value){
    return collection.all[named].push(value);
  }
}
