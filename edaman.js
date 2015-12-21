logger = require('./logger').logger();

module.exports.query = function(query, callback){
	var http = require('https');
	var path = '/search?application_key=a1a9f67c942177f9a47bd7b653caebd6&q='+require('querystring').escape(query);

	logger.info(path);

	var options = {
	  hostname: 'api.edamam.com',
	  path: path,
	  method: 'GET',
	};

	var req = http.request(options, responseH(callback));
	req.on('error', errorH(callback));
	req.end();
};

responseH = function(callback){
	return function(res) {
	  	res.setEncoding('utf8');
		var body = '';
	    res.on('data', function(d) {
	        body += d;
	    });
	    res.on('end', function() {
	        logger.info('calling back from edaman response');	
	        callback(JSON.parse(body));
	    });
	}
};

errorH = function(callback){
	return function(e) {
  		logger.info('problem with request: ' + e.message);
  		callback('none');
	}	
}