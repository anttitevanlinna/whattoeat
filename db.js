  var mongodb = require('mongodb');
  var uri = 'mongodb://heroku_app31811253:g4s8gcd4h69dtde70iqof74p7b@ds051990.mongolab.com:51990/heroku_app31811253';
var mdb = null;
var foodcollection;
var collectionName = 'foods';

// calls back when connection is there, with the collection
module.exports.connect = function( callback ){
     if (mdb === null) {    
       console.log('connection to '+ collectionName);
       mongodb.MongoClient.connect(uri, function(err, db) {
    
        if( err ){
          console.log(err)
        }

        foodcollection = db.collection(collectionName);
        mdb = db;
        console.log('db init done, doing callback '+foodcollection);
        callback( foodcollection );

       });

    }else{
        callback( foodcollection );
    }
  }

  // calls back with the items 
  module.exports.getfoods = function(foodcollection, callback){
     foodcollection.find().toArray(
       function(err, items){
         if(err){
           console.log(err);
         }
         console.log('find done');
         callback(items);
       });
  };

 module.exports.getfoodbyname = function( foodcollection, name,   callback){
  var query = {name: name};
  foodcollection.findOne(query, 
       function(err, item){
         if(err){
           console.log('error in getfoodbyname' + err);
         }
         console.log('find done for '+name +' got '+item);
         callback(item);
       }); 
 }
  
 module.exports.close = function(){
    console.log('db closing...');
    mdb.close(function (err) {
       mdb = null;
       if(err) throw err;
    });    
  }


