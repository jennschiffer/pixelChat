/*** pixelChat app.js ***/

// twitter passport
var configDoc = require('./config');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var username = '';

passport.use(new Strategy({
    consumerKey: twitterAPI.consumer_key,
    consumerSecret: twitterAPI.consumer_secret,
    callbackURL: twitterAPI.callback_url
},
function(token, tokenSecret, profile, cb) {
  return cb(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



// express 
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var connect = require('connect-ensure-login');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({secret:'pumajef', resave:true, saveUninitialized:true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));



// routes
app.get('/',
  function(req, res) {
    res.redirect('/login');
  });

app.get('/login',
  function(req, res){
    res.sendFile(__dirname + '/views/login.html');
  });
  
app.get('/nope',
  function(req, res){
    res.sendFile(__dirname + '/views/nope.html');
  });

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/return', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    
    // only allow user if they are on the config list
    if ( twitterUsers.indexOf(req.user.username) !== -1 ) {
      res.cookie('pixelchat', req.user.username);
      res.redirect('/chat');
    }
    else {
      res.clearCookie('pixelchat');
      res.redirect('/nope');
    }
  });

app.get('/chat',
  connect.ensureLoggedIn(),
  function(req, res){
    res.sendFile(__dirname + '/views/chat.html');
  });



// socket.io 
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

io.sockets.on('connection', function (socket) {

  socket.on('send', function (data) { 
    if ( data.chat) {
      io.sockets.emit('message',data);            
    } 
  });

  socket.on('disconnect', function (){ });
});
