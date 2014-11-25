var db = require('../db');

db.connect('foods', 
  function(foodcollection) {
    db.getfoods(foodcollection, function(items){
      items.forEach(function(item){
        console.log(item);
      });
    db.close();

  });
});
