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