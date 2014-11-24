var db = require('./db');
db.collectionName = 'testfoods';

console.log('checking 1');
db.connect(function(foodcollection) {
console.log('checking 2 '+foodcollection);
console.log(db.getfoods(foodcollection, function(items){
  console.log('items '+items);
  items.forEach(function(item){
    console.log(item);
  });
  console.log('checking 3');
  db.close();
  console.log('checking 4');

}));
});
