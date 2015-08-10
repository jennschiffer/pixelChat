/**
* create an app and get your own damn keys 
* on https://apps.twitter.com/ <3
* then rename this file to config.js
*/

// twitter app stuff
twitterAPI = {
  consumer_key: '',
  consumer_secret: '',
  callback_url: 'http://127.0.0.1:3000/login/twitter/return',
};

// list of twitter usernames to allow in chat
twitterUsers = ['jennschiffer'];