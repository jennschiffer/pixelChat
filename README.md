pixelChat
=========

a node/websockets drawing chat adapted from [jsChat](http://github.com/jennschiffer/jschat) and inspired by [make8bitart.com](https://make8bitart.com)!

![screenshot of pixelchat in action](https://cdn.glitch.com/f46f2fe8-b663-4efd-b7b6-fe1b75299cf9%2FScreenshot%202017-05-09%2015.08.32.png?1494356961859)

### Features

* websockets real-time chat
* draw your messages instead of typing
* twitter auth, because randos ruin everything!!

### Install on Glitch
1. [remix pixelchat on glitch](https://glitch.com/edit/#!/remix/pixelchat)
2. create a [twitter app](http://apps.twitter.com/), update `.env` with twitter keys
3. update `.env` with the list of twitter handles you'd like to whitelist

### Install outside of [Glitch](http://pixelchat.glitch.me)

1. add files to some directory on your server - [node must be installed](http://nodejs.org/download/).
2. go into the pixelchat directory and install dependencies by running: <code>npm install</code> (dependencies: express, socket.io)
3. create a [twitter app](http://apps.twitter.com/), update `.env` with twitter keys
4. update `.env` with the list of twitter handles you'd like to whitelist
5. run `node app.js` to launch 

### Notes 

1. works on browsers that support [socket.io](http://socket.io/#browser-support) and [html5 canvas](http://caniuse.com/canvas).

2. if you have suggestions and tips, please [post an issue](https://github.com/jennschiffer/pixelChat/issues)!. 
