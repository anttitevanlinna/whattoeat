var express = require('express');
var db = require('./db');
var fb = require('./fb');
var logger = require('./logger').logger();

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
  logger.info('random');
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

app.get('/api/count', function(request, response) {
  logger.info('count');
  if(request.query.accessToken){
  	fb.me(request.query.accessToken, function(user){
		logger.info('calling db for count: '+user.id);
		db.countfoods(user.id, function(item){
			logger.info('counted: '+item);
      		response.send(String(item)); 
  		});
	});
  }else{
	response.send('{error}'); 
  }
});

app.post('/api/add', function(request, response){
  fb.me(request.body.accessToken, function(user){
	logger.info('add given access token with prefix ' + request.body.accessToken.substring(0,4));
  	if(user.id){
	  db.add(request.body.food, user, function(item){
	     logger.info('addfood' + item);
	     response.send(item); 
	  });
  	}else{
  		response.send('{error}');
  	}
  });
});

app.listen(app.get('port'), function() {
  logger.info("Node app is running at localhost:" + app.get('port'))
})
