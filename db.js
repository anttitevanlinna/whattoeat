  var mongodb = require('mongodb');
  var uri = 'mongodb://heroku_app31811253:g4s8gcd4h69dtde70iqof74p7b@ds051990.mongolab.com:51990/heroku_app31811253';
var mdb;
var collectionName = 'foods';

// calls back when connection is there, with the collection
module.exports.connect = function( callback ){
     if (mdb === undefined) {    
       console.log('connection to '+ collectionName);
       mongodb.MongoClient.connect(uri, function(err, db) {
    
        if( err ){
          console.log(err)
        }

        var foodcollection = db.collection(collectionName);
        mdb = db;
        console.log('db init done, doing callback '+foodcollection);
        callback( foodcollection );

       });

    }
  }

  // calls back with the items 
  module.exports.getfoods = function(foodcollection, callback){
     return foodcollection.find().toArray(
       function(err, items){
         if(err){
           console.log(err);
         }
         console.log('find done');
         callback(items);
       });
  };
  
 module.exports.close = function(){
    console.log('db closing...');
    mdb.close(function (err) {
       if(err) throw err;
    });    
  }


