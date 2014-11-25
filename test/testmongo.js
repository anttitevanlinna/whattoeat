module.exports['addandremove'] = function (test) {
  
  test.expect(1);
  
  var db = require('../db');
  var seed = require('../utils/seedfoods');
  db.collectionName = 'testfoods';

  seed('testfoods', function(){
    console.log('checking 1');
    db.connect(function(collection){
      console.log('checking 2');
      db.getfoods(collection, function(items){
        test.ok(items.length > 0);        
        console.log('checking 3');
        db.close();
        console.log('checking 4');
        test.done();
      });
      console.log('checking 5');
      
    });
  });
  
};

module.exports['findafood'] = function (test) {
  test.expect(2);
  
  var db = require('../db');
  var seed = require('../utils/seedfoods');
  db.collectionName = 'testfoods';
  seed('testfoods', function(){
    db.connect(function(collection){
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
