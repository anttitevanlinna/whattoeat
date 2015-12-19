var express = require('express');
var db = require('./db');
var fb = require('./fb');
var app = express();
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/api/fbconfig/', function(request, response) {
  response.send(String(app.get('port') == 8080?508881345922543:785659141493231));
});	  
     
app.get('/api/randomfood', function(request, response) {

  console.log('random ' + request.query.accessToken);
  if(request.query.accessToken){
  	fb.me(request.query.accessToken, function(user){
		db.random(user.id, function(item){
      		response.send(item); 
  		});
	});
  }else{
	db.random(null, function(item){
  		response.send(item); 
	});  	
  }
});

app.post('/api/add', function(request, response){

  console.log('add ' + request.body.accessToken);

  fb.me(request.body.accessToken, function(user){
  	if(user.id){
	  db.add(request.body.food, user, function(item){
	     console.log('addfood' + item);
	     response.send(item); 
	  });
  	}else{
  		response.send('{error}');
  	}
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
