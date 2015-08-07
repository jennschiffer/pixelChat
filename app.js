/*** pixelChat app.js ***/

/* express */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// index
app.get('/', function(req, resp) {
  resp.sendfile(__dirname + '/views/index.html');
});

/* socket.io */
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

io.sockets.on('connection', function (socket) {

  socket.on('send', function (data) { 
  console.log(socket);
    if ( data.chat) {
      // send messages
      io.sockets.emit('message',data);            
    } 
  });

  socket.on('disconnect', function () { });
});
