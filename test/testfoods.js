var foods = require('../foods');

exports['return'] = function (test) {
    
    out = foods.random();
  
    test.ok(foods.isvalid(out));
    test.done();
};