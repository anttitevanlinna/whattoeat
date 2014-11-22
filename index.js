var express = require('express');
var foods = require('./foods');
var app = express();


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/api/randomfood', function(request, response) {
  response.send( foods.random() );
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
