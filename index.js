var express = require('express');
var foods = require('./foods');
var app = express();


app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))

app.get('/api/randomfood', function(request, response) {
  foods.random(function(item){
      console.log(item);
      response.send(item); 
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
