module.exports = function (hostname, port, method, path, headers, respReady) {

  var http = require('http');
  var JSON = require('json');

  var options = {
    port: port,
    hostname: hostname,
    path: path
  };
  
  console.log('connection to '+hostname+' '+port+' '+path);
  
  http.get("http://www.google.com/index.html", function(res) {
    console.log("Got response: " + res.statusCode);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
/*  
  var req = http.request(options, function(response){
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.response));

    response.on('data', function (chunk) {
      if (response.body) {
        response.body += chunk;
      } else {
        response.body = chunk;
      }
    });
    response.on('end', function () {
      if (response.headers['content-type'] === 'application/json') {
        response.bodyAsObject = JSON.parse(response.body);
      }
      console.log('http response: '+ response);
      respReady(response);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
   });
  req.end();
*/
}