var mongodb = require('mongodb');
var uri = 'mongodb://simpleton:simpleton1@ds051990.mongolab.com:51990/heroku_app31811253';
var mdb = null;

// calls back when connection is there, with the collection
module.exports.connect = function( collectionName, callback ){
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
  foodcollection.find().toArray( function(err, items){
    if(err){
      console.log(err);
    }
    callback(items);
  });
};

module.exports.getfoodbyname = function( foodcollection, name, callback){
  var query = {name: name};
  foodcollection.findOne(query, function(err, item){
    if(err){
      console.log('error in getfoodbyname' + err);
    }

    if( item == undefined){
    }else{
      item.status = 'ok';         
    }

    console.log('find done for '+name +' got '+item);
    callback(item);
  }); 
 }
 
 // calls back with the chosen food
module.exports.random = function(callback){
  module.exports.connect('foods',function(collection){
     module.exports.getfoods(collection, function(foods){
       value = foods[Math.floor(Math.random()*foods.length)];
       value.status = 'ok';
       callback( value );
    })
  });
}

module.exports.add = function(food, creator, callback){
  module.exports.connect('foods',function(collection){
    module.exports.addfood(collection, food, creator, function(result){
      var oneitem = result[0];
      oneitem.status = result.status;
      console.log('add() '+oneitem);
      callback(oneitem);
    });
  });                    
}

module.exports.addfood = function(foodcollection, item, creator, callback){
  module.exports.getfoodbyname( foodcollection,item, function(result){
    if(result == undefined ){
      console.log('add: '+item+' doesnt exists, adding');
      module.exports.addfoodlist(foodcollection, [item], creator, callback);
    }else{
      value = [result];
      value.status = 'already_exists';
      console.log('add: '+item+' existed, skipping add '+value);
      callback(value);
    }
  });
}

module.exports.addfoodlist = function(foodcollection, list, creator2, callback){
  
  var insertlist = [];
  list.forEach( function(item) {
    insertlist.push({ 
      name: item, 
      creator: creator2
    });
  }); 

  foodcollection.insert(insertlist, function (err, result) {
    if(err) {
      console.log(err);
      callback(err); 
    }

    console.log('insert done '+result);
    result.status = 'ok';
    callback(result);
  });
}
  
module.exports.close = function(){
  console.log('db closing...');
  mdb.close(function (err) {
    mdb = null;
    if(err) throw err;
  });    
}
