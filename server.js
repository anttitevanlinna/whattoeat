var express = require('express');

module.exports = function(callback){

  var foods = require('./foods');
  var app = express();

  app.set('port', (process.env.PORT || 5000))
  app.use(express.static(__dirname + '/public'))

  app.get('/', function(request, response) {
    response.send( foods.random() );
  })
  var server = app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
  })
/*  app.get('/quit', function(req,res) {
    res.send('closing..');
    server.close();
  });
*/

  return app; 
}