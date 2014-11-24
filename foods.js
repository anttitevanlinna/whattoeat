// calls back with the chosen food
module.exports.random = function(callback){

  console.log('getting a random food');
  var db = require('./db');
  db.connect(function(collection){
    db.getfoods(collection, function(foods){
      callback( foods[Math.floor(Math.random()*foods.length)] );
    })
  });
}

module.exports.isvalid = function(string){
  return 3 < string.length;
}

module.exports.foodlist = function(){
  var foods = ['pasta', 'pizza', 'soup', 'nothing', 'just        candy','fettucine alfredo','ham and eggs', 'steak'];
  return foods;
}