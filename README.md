pixelChat
=========

a node/websockets drawing chat adapted from [jsChat](http://github.com/jennschiffer/jschat)!

### Features
* websockets real-time chat
* draw your messages instead of typing
* sign and save artwork

### Install

1. add files to some directory on your server - [node must be installed](http://nodejs.org/download/).
2. go into the jschat directory and install dependencies by running: <code>npm install</code> (dependencies: express, socket.io)
3. to start chat server, run <code>npm start</code>
4. direct your browser to <code>localhost:3000</code>

### Notes 

1. works on browsers that support [socket.io](http://socket.io/#browser-support) and [html5 canvas](http://caniuse.com/canvas).

2. you can see this in the wild on my own deployment at [make8bitart.com/chat](http://make8bitart.com/chat)

3. if you have suggestions and tips, please PLEASE [post an issue](https://github.com/jennschiffer/pixelChat/issues) or reach out to me <jenn@pancaketheorem.com>. I'd love to get some insight and feedback from those of you who are experienced with these technologies