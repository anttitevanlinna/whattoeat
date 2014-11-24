  var mongodb = require('mongodb');
  var uri = 'mongodb://heroku_app31811253:g4s8gcd4h69dtde70iqof74p7b@ds051990.mongolab.com:51990/heroku_app31811253';
  var mdb;
  var foodcollection;
  var collectionName = 'foods';


module.exports.connect = function(){
  
  
  mongodb.MongoClient.connect(uri, function(err, db) {
    this.foodcollection = db.collection(this.collectionName);
    this.mdb = db;
  });
}

  module.exports.getfoods = function(){
     return {};
  };
  
 module.exports.close = function(){
    this.mdb.close(function (err) {
       if(err) throw err;
    });    
  }


