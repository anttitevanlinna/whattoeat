var logger = require('./logger').logger();

responseHandler = function(callback){
	return function(res) {
	  	res.setEncoding('utf8');
		var body = '';
	    res.on('data', function(d) {
	        body += d;
	        logger.info(d);
	    });
	    res.on('end', function() {
	        logger.info('Calling back from server response with :'+body+':');	
	        callback(JSON.parse(body));
	    })
	    res.on('error', function(error){
	    	logger.info(error);
	    });
	}
}

module.exports.me = function(accessToken, callback){

    logger.info('Executing FB me with token with prefix '+accessToken.substring(0,4));	

	var me = 'https://graph.facebook.com/v2.0/me?access_token='+accessToken;
	require('https').get(me, responseHandler(callback));
}