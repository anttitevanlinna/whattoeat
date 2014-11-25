module.exports = function(collectionName, callback2){
  
var db = require('../db');
var foods = require('../foods');
db.collectionName = 'testfoods';

db.connect( function( foodcollection ){
  var insertlist = [];
  foods.foodlist().forEach( function(item) {
    insertlist.push({ name: item });
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

