module.exports = function(collectionName, callback){
  
var mongodb = require('mongodb');
var uri = 'mongodb://heroku_app31811253:g4s8gcd4h69dtde70iqof74p7b@ds051990.mongolab.com:51990/heroku_app31811253';
var foods = require('./foods');

mongodb.MongoClient.connect(uri, function(err, db) {
  var foodcollection = db.collection(collectionName);
  var insertlist = [];
  foods.foodlist().forEach( function(item) {
    insertlist.push({ name: item });
  }); 
  
  foodcollection.insert(insertlist,
        function (err, result) {
           console.log('insert done');
           if(err) callback(err); 
           db.close(function (err) {
              if(err) callback(err);
           });
          callback(result);
        }
   );
});
  
}

