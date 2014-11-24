module.exports['addandremove'] = function (test) {
  
  test.expect(1);
  
  var db = require('../db');
  var seed = require('../seedfoods');
  db.collectionName = 'testfoods';

  seed('testfoods', function(){
//    test.ok(db.getfoods()[0].length > 0);
    console.log('checking');
    test.done();
  });

  test.done();
  
};