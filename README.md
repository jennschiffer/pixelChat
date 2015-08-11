pixelChat
=========

a node/websockets drawing chat adapted from [jsChat](http://github.com/jennschiffer/jschat)!

### Features
* websockets real-time chat
* draw your messages instead of typing
* twitter auth, because randos ruin everything

### Install

1. add files to some directory on your server - [node must be installed](http://nodejs.org/download/).
2. go into the pixelchat directory and install dependencies by running: <code>npm install</code> (dependencies: express, socket.io)
3. create a [twitter app](http://apps.twitter.com/), update `config-example.js` and rename it to `config.js` for authenticationß
4. to start chat server, run <code>npm start</code>
5. direct your browser to <code>localhost:3000</code>
6. if running this on another port or domain, change line 24 in `app/pixelchat.js` to match or else you'll get CORS errors

### Notes 

1. works on browsers that support [socket.io](http://socket.io/#browser-support) and [html5 canvas](http://caniuse.com/canvas).

2. if you have suggestions and tips, please [post an issue](https://github.com/jennschiffer/pixelChat/issues)!. 