
module.exports = function(collectionName, callback2){
  
var foodlist = ['pasta', 'pizza', 'soup', 'nothing', 'candy','fettucine alfredo','ham and eggs', 'steak', 'beef stew'];

var db = require('../db');
db.collectionName = collectionName;

db.connect( collectionName, function( foodcollection ){
  var insertlist = [];
  foodlist.forEach( function(item) {
    insertlist.push({ name: item,
                     creator: 'nobody',
                     creatorId: '11'});
  }); 
  
  foodcollection.insert(insertlist,
        function (err, result) {
           console.log('insert done');
           if(err) {
             console.log(err);
             callback2(err); 
           }
          
          console.log('insert done '+result);
          callback2(result);
        }
   );
  
});

}

module.exports.isvalid = function(string){
  return 3 < string.length;
}