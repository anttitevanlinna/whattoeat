module.exports['addandremove'] = function (test) {
  
  test.expect(1);
  
  var db = require('../db');
  var seed = require('../utils/seedfoods');

  seed('testfoods', function(){
    db.connect('testfoods', function(collection){
      db.getfoods(collection, null, function(items){
        test.ok(items.length > 0);        
        db.close();
        test.done();
      });
    });
  });
  
};

module.exports['findafood'] = function (test) {
  test.expect(2);
  
  var db = require('../db');
  var seed = require('../utils/seedfoods');
  seed('testfoods', function(){
    db.connect('testfoods',function(collection){
      db.getfoodbyname(collection, 'pasta', function(item){
        test.equal(item.name, 'pasta', 'was expecting pasta but got '+ item.name);        
        db.getfoodbyname(collection, 'pasta22', function(item){
          test.equal(item, null, 'was expecting null but got '+ item);      
          db.close();
          test.done();
        });  
      });  
    });
  });
}

module.exports.testAddFind = function(test){

  test.expect(2);

  var db = require('../db');
  var randomname = 'string'+Date.now().toString();
  db.connect('testfoods',function(collection){
    db.addfood(collection, randomname, {}, function(){
      db.getfoodbyname(collection, randomname, function(item){
        test.equal(item.name, randomname, 'was expecting pasta but got '+ item.name);
        db.addfood(collection, randomname, {}, function(result){
          test.equal(result.status, 'already_exists');
          db.close();
          test.done();
        });
      });
    });
  });
}

module.exports.testAddFindByCreator = function(test){

  test.expect(1);

  var db = require('../db');
  var randomname = 'string'+Date.now().toString();
  db.connect('testfoods', function(collection){
    db.addfood(collection, randomname, {name:'nobody', id: randomname}, function(){
      db.getfoods(collection, randomname, function(item){
        test.equal(item[0].name, randomname, 'was expecting the random name but got '+ item[0].name);
        db.close();
        test.done();
      });
    });
  });
};