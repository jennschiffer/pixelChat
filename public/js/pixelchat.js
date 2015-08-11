window.onload = function() {
    
  var messageContainer,
      messageForm,
      formAlert,
      username,
      imgURL, 
      socket, 
      banter,
      $canvas,
      $colorButtons,
      ctx;
      
  var pixel = {
    size: 5,
    color: '#000'
  };
      
  var copy = {
    disconnected: 'You have been disconnected.<br />Refresh to try entering again.',
  };
      
  var system = {
    io: 'http://127.0.0.1:3000',
    name: 'pixelChat',
    canvasHeight: 150,
    canvasWidth: 400,
    initMessage: 'data:image/png;base64,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'
  };
      
    
  /*** INIT SOCKETS AND CHAT ***/

  var initpixelChat = function() {
      
    /*** pixelChatroom and its events ***/
    messageContainer = document.getElementById('pixelChat-messages');
    usernameContainer = document.getElementById('pixelChat-username');
    usernameContainer.innerHTML = username;

    messageForm = document.forms[0];
    banter = [];
    
    initialMessage = '<li><img src="' + system.initMessage + '" /><span class="nickname"><a target="_blank" href="http://twitter.com/jennschiffer">@jennschiffer</a></span></li>';
    messageContainer.innerHTML = initialMessage;
  
    // canvas stuff 
    $canvas = $('canvas');
    ctx = $canvas[0].getContext("2d");
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,system.canvasWidth,system.canvasHeight);
        
    $canvas.mousedown(onPenDown).mouseup(onPenUp).mouseout(onPenUp);
    $canvas[0].addEventListener('touchstart', onPenDown, false);
    $canvas[0].addEventListener('touchend', onPenUp, false);
    
    // art tools
    $colorButtons = $('.button');
    $colorButtons.each(function(){
      var $this = $(this);
      $this.css('background-color', $this.attr('data-color'));
    });
    
    // color change event
    $colorButtons.click(function(){
      $colorButtons.removeClass('current');
      var $this = $(this).addClass('current');
      var newColor = $this.attr('data-color');
      pixel.color = newColor;
    });
        
    // submit form event
    messageForm.onsubmit = function() {
      formAlert = document.getElementById('form-alert');
      formAlert.innerHTML = '';
  
      imgURL = $canvas[0].toDataURL("image/png");
      sendMessage( username, imgURL );
      resetCanvas();
      return false;
    };
    
    // reset form event
    messageForm.onreset = function() {
      resetCanvas();
      return false;
    };
  };
      
  var initSocket = function() {
      
    socket = io.connect(system.io);
    
    socket.on('connect',function() {
      initpixelChat(); 
    });
    
    socket.on('message',function(data) {
      if ( data.chat ) {
        updateMessageWindow(data.chat);
      }
    });
    
    socket.on('disconnect',function() {            
      messageForm.innerHTML = copy.disconnected;
    });
  };
  
    
    
    
  /*** HELPERS ***/
  
  /* socket */
  
  var updateMessageWindow = function(chatData) {
    banter.push(chatData);
    var banterHTML = '';
    
    // remove one if array >= 50
    if ( banter.length >= 50 ) {
      banter.shift();
    }
    
    for ( var i = 0; i < banter.length; i++ ) {
      banterHTML += '<li><a href="' + banter[i].imgURL + '" target="_blank"><img src="' + banter[i].imgURL + 
              '" /></a><span class="nickname"><a href="http://twitter.com/' + banter[i].username + 
              '" target="_blank">@' + banter[i].username + '</a></span></li>';
    }
    messageContainer.innerHTML = banterHTML;
    $(messageContainer).animate({"scrollTop": messageContainer.scrollHeight}, "slow");
  };    
  
  var sendMessage = function( nick, url ) {
    var message = {
      username: nick,
      imgURL: url,
      timestamp: Date.now()
    };
    socket.emit('send', { chat: message });
  };
    
    
  /* drawing */
    
  var onPenDown = function(e) {
    e.preventDefault();
    drawPixel(e);
    $canvas.on('mousemove', drawPixel);
  };
  
  var onPenUp = function(e) {
    $canvas.off('mousemove');
  };
    
  var drawPixel = function(e) {    
    var canvasPosition = $canvas.offset();
    xPos = e.pageX - canvasPosition.left;
    yPos = e.pageY - canvasPosition.top;

    ctx.beginPath();  
    xPos = ( Math.ceil(xPos/pixel.size) * pixel.size ) - pixel.size;
    yPos = ( Math.ceil(yPos/pixel.size) * pixel.size ) - pixel.size;
    ctx.moveTo (xPos, yPos);          
    ctx.fillStyle = pixel.color;
    ctx.lineHeight = 0;
    ctx.fillRect(xPos,yPos,pixel.size,pixel.size);
  };
    
  var resetCanvas = function() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,system.canvasWidth,system.canvasHeight);
  };
  
  /* misc */
  
  var getCookies = function() {
    var cookies = {};
    var documentCookies = document.cookie;
    
    if (documentCookies === "") {
      return cookies;
    }
    
    var cookiesArray = documentCookies.split("; ");
    
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i];
      var endOfName = cookie.indexOf("=");
      var name = cookie.substring(0, endOfName);
      var value = cookie.substring(endOfName + 1);
      value = decodeURIComponent(value);
      cookies[name] = value;
    }
    
    return cookies;
  };



    
  /*** INIT ***/
  
  var init = (function() {
    var cookies = getCookies();
    
    if ( cookies.pixelchat) {
      username = cookies.pixelchat;      
      initSocket();
    }

  }());
  
};