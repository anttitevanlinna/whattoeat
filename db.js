var mongodb = require('mongodb');
var uri = 'mongodb://simpleton:simpleton1@ds051990.mongolab.com:51990/heroku_app31811253';
var mdb = null;

module.exports.log = require('./logger').logger();

// calls back when connection is loaded, with the collection
module.exports.connect = function(collectionName, callback){
  if (mdb === null) {    
    module.exports.log.info('connection to '+ collectionName);

    mongodb.MongoClient.connect(uri, function(err, db) {

      if( err ){
        module.exports.log.info(err)
      }

      foodcollection = db.collection(collectionName);
      mdb = db;
      module.exports.log.info('db init done');
      callback(foodcollection);
    });
  }else{
    callback(foodcollection);
  }
}

// calls back with the items 
module.exports.getfoods = function(foodcollection, creatorId, callback){
  handler = function(err, items){
    if(err){
      module.exports.log.info(err);
    }
    module.exports.log.info('found foods for '+creatorId);
    callback(items);
  }
  if( creatorId ){
    module.exports.log.info('finding foods for '+creatorId);
    foodcollection.find({ 'creatorId': creatorId }).toArray(handler);
  }else{
    module.exports.log.info('finding all foods');
    foodcollection.find().toArray(handler);
  }
};

module.exports.countfoods = function(creatorId, callback){
  module.exports.connect('foods',function(collection){
    module.exports.count(collection, creatorId, callback);
  });
}

module.exports.count = function(foodcollection, creatorId, callback){
  handler = function(err, items){
    if(err){
      module.exports.log.info(err);
    }
    module.exports.log.info('counted foods for '+creatorId+': '+items);
    callback(items);
  }
  module.exports.log.info('counting foods for '+creatorId);
  foodcollection.count({ 'creatorId': creatorId }, handler);
};

module.exports.getfoodbyname = function( foodcollection, name, callback){
  var query = {name: name};
  foodcollection.findOne(query, function(err, item){
    if(err){
      module.exports.log.info('error in getfoodbyname' + err);
    }

    if( item == undefined){
    }else{
      item.status = 'ok';         
    }

    module.exports.log.info('find done for '+name +' got '+item);
    callback(item);
  }); 
 }
 
 // calls back with the chosen food
module.exports.random = function(creatorId, callback){
  module.exports.connect('foods',function(collection){
     module.exports.getfoods(collection, creatorId, function(foods){

        var position = Math.floor(Math.random()*foods.length);
        module.exports.log.info('randomizing selection of foods, count '+foods.length+' position, '+position);

        value = foods[position];
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
      module.exports.log.info('add() '+oneitem);
      callback(oneitem);
    });
  });                    
}

module.exports.addfood = function(foodcollection, item, creator, callback){
  module.exports.getfoodbyname( foodcollection,item, function(result){
    if(result == undefined ){
      module.exports.log.info('add: '+JSON.stringify(item)+' doesnt exists, adding');
      module.exports.addfoodlist(foodcollection, [item], creator, callback);
    }else{
      value = [result];
      value.status = 'already_exists';
      module.exports.log.info('add: '+item+' existed, skipping add '+value);
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
      module.exports.log.info(err);
      callback(err); 
    }

    module.exports.log.info('insert done '+result);
    result.status = 'ok';
    callback(result);
  });
}
  
module.exports.close = function(){
  module.exports.log.info('db closing...');
  mdb.close(function (err) {
    mdb = null;
    if(err) throw err;
  });    
}
