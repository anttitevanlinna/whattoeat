var foods = require('../foods');

exports['return'] = function (test) {
    
    out = foods();
    console.log(out);
  
    test.notEqual(out,'bar');
    test.done();
};