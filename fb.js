responseHandler = function(callback){
	return function(res) {
	  	res.setEncoding('utf8');
		var body = '';
	    res.on('data', function(d) {
	        body += d;
	    });
	    res.on('end', function() {
	        console.log('Calling back from server response with '+body);	
	        callback(JSON.parse(body));
	    });
	}
}

module.exports.me = function(accessToken, callback){

	var me = 'https://graph.facebook.com/v2.0/me?access_token='+accessToken;

	require('https').get(me, responseHandler(callback));
}