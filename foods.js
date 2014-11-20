module.exports = function(callback){
  var foods = ['pasta', 'pizza', 'soup', 'nothing', 'just candy'];
  return foods[Math.floor(Math.random()*foods.length)];
}