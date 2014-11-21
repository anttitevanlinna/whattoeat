module.exports = function(callback){
  var foods = ['pasta', 'pizza', 'soup', 'nothing', 'just candy','fettucine alfredo','ham and eggs', 'steak'];
  return foods[Math.floor(Math.random()*foods.length)];
}