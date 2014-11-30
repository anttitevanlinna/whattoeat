var express = require('express');
var db = require('./db');
var app = express();
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/api/randomfood', function(request, response) {
  db.random(function(item){
      response.send(item); 
  });
})

app.post('/api/add', function(request, response){
  var newfood = request.body.food;
  db.add(newfood, function(item){
     console.log('addfood' + item);
     response.send(item); 
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
