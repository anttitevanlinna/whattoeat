module.exports.random = function(callback){
  var foods = this.foodlist();
  return foods[Math.floor(Math.random()*foods.length)];
}

module.exports.isvalid = function(string){
  return 3 < string.length;
}

module.exports.foodlist = function(){
  var foods = ['pasta', 'pizza', 'soup', 'nothing', 'just        candy','fettucine alfredo','ham and eggs', 'steak'];
  return foods;
}