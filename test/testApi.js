module.exports.testget = function(test) {

test.expect(1);
  
var httputil = require('./httputil');
var server = require('../server');
var foods = require('../foods');
var app = server();
  
var hostname = process.env.HOSTNAME || 'localhost';

process.nextTick(function(){
  console.log('checking');

  httputil(hostname, app.get('port'), 'GET', '/', {},     
           function(resp) {
            test.ok( foods.isvalid( resp.body ));
            console.log('checked');
  });
  httputil(hostname, app.get('port'), 'GET', '/quit', {}, function(){} );

  for(;;){}
  
    console.log('checking done');
    test.done();
});
}

