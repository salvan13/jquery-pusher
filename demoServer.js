var connect = require('connect')
  , http = require('http');

var app = connect()
  .use(connect.static('demos'))
  .use(connect.directory('demos'));


var port = 3000;
http.createServer(app).listen(port);
console.log('running on http://127.0.0.1:' + port + '/');
