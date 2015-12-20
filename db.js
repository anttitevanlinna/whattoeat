var mongodb = require('mongodb');
var logger = require('./logger').logger();
var uri = 'mongodb://simpleton:simpleton1@ds051990.mongolab.com:51990/heroku_app31811253';
var mdb = null;

// calls back when connection is there, with the collection
module.exports.connect = function( collectionName, callback ){
  if (mdb === null) {    
    logger.info('connection to '+ collectionName);
    mongodb.MongoClient.connect(uri, function(err, db) {

      if( err ){
        logger.info(err)
      }

      foodcollection = db.collection(collectionName);
      mdb = db;
      logger.info('db init done');
      callback( foodcollection );
    });
  }else{
    callback( foodcollection );
  }
}

  // calls back with the items 
module.exports.getfoods = function(foodcollection, creatorId, callback){
  handler = function(err, items){
    if(err){
      logger.info(err);
    }
    logger.info('found foods for '+creatorId);
    callback(items);
  }
  if( creatorId ){
    logger.info('finding foods for '+creatorId);
    foodcollection.find({ 'creatorId': creatorId }).toArray(handler);
  }else{
    logger.info('finding all foods');
    foodcollection.find().toArray(handler);
  }
};

module.exports.getfoodbyname = function( foodcollection, name, callback){
  var query = {name: name};
  foodcollection.findOne(query, function(err, item){
    if(err){
      logger.info('error in getfoodbyname' + err);
    }

    if( item == undefined){
    }else{
      item.status = 'ok';         
    }

    logger.info('find done for '+name +' got '+item);
    callback(item);
  }); 
 }
 
 // calls back with the chosen food
module.exports.random = function(creatorId, callback){
  module.exports.connect('foods',function(collection){
     module.exports.getfoods(collection, creatorId, function(foods){
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
      logger.info('add() '+oneitem);
      callback(oneitem);
    });
  });                    
}

module.exports.addfood = function(foodcollection, item, creator, callback){
  module.exports.getfoodbyname( foodcollection,item, function(result){
    if(result == undefined ){
      logger.info('add: '+JSON.stringify(item)+' doesnt exists, adding');
      module.exports.addfoodlist(foodcollection, [item], creator, callback);
    }else{
      value = [result];
      value.status = 'already_exists';
      logger.info('add: '+item+' existed, skipping add '+value);
      callback(value);
    }
  });
}

module.exports.addfoodlist = function(foodcollection, list, creator2, callback){
  
  var insertlist = [];
  list.forEach( function(item) {
    insertlist.push({ 
      name: item, 
      creator: creator2.first_name,
      creatorId: creator2.id
    });
  }); 

  foodcollection.insert(insertlist, function (err, result) {
    if(err) {
      logger.info(err);
      callback(err); 
    }

    logger.info('insert done '+result);
    result.status = 'ok';
    callback(result);
  });
}
  
module.exports.close = function(){
  logger.info('db closing...');
  mdb.close(function (err) {
    mdb = null;
    if(err) throw err;
  });    
}
