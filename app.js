/*** pixelChat app.js ***/

/* express */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

/* twitter auth */

var configDoc = require('./config');
var Twitter = require('twitter-node-client').Twitter;
var config = {
    "consumerKey": twitterAPI.consumer_key,
    "consumerSecret": twitterAPI.consumer_secret,
    "accessToken": twitterAPI.access_token_key,
    "accessTokenSecret": twitterAPI.access_token_secret,
    //"callBackUrl": twitterAPI.access_token_key
}

var twitter = new Twitter(config);


// index
app.get('/', function(req, resp) {
  resp.sendFile(__dirname + '/views/index.html');
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

  socket.on('disconnect', function (){ });
});
