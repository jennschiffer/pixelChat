window.onload = function() {
    
    var messageContainer,
    	messageForm,
    	formAlert,
        nickname,
        imgURL, 
        socket, 
        banter,
        $canvas,
        ctx;
        
    var pixel = {
	    size: 5,
	    color: '#000'
    }
        
    var copy = {
	    disconnected: 'You have been disconnected. Refresh to try entering again.',
    };
        
    var system = {
    	io: 'http://localhost:3000',
        name: 'pixelChat',
        canvasHeight: 150,
        canvasWidth: 400,
        initMessage: 'data:image/png;base64,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'
    };
    	
    
    /*** INIT SOCKETS AND CHAT ***/

    var initpixelChat = function() {
        
        /*** pixelChatroom and its events ***/
        messageContainer = document.getElementById('pixelChat-messages');
        messageForm = document.forms[0];
        banter = [];
        
        initialMessage = '<li><img src="' + system.initMessage + '" /><span class="nickname">jenn$</span></li>';
        messageContainer.innerHTML = initialMessage;

		// canvas stuff 
		$canvas = $('canvas');
        ctx = $canvas[0].getContext("2d");
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0,0,system.canvasWidth,system.canvasHeight)
        
		$canvas.mousedown(onPenDown).mouseup(onPenUp);
        
        // submit form event
        messageForm.onsubmit = function() {
            nickname = messageForm.nickname.value;
            formAlert = document.getElementById('form-alert');
            if ( !nickname ) {
            	formAlert.innerHTML = 'ENTER A NICKNAME, PAL!';
	            return false;
            }
            formAlert.innerHTML = '';
  			
  			imgURL = $canvas[0].toDataURL("image/png");
        	sendMessage( nickname, imgURL );
			resetCanvas()
            return false;
        };
        
        // reset form event
        messageForm.onreset = function() {
	        resetCanvas();
	        return false;
        }

    };
    
    /*** initialize socket and its events ***/
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
        
        for ( var i = 0; i < banter.length; i++ ) {
	        banterHTML += '<li><img src="' + banter[i].imgURL + '" /><span class="nickname">' + banter[i].nickname + '</span></li>';
        }
        //only show the last 10 or last 10 minutes of images
        messageContainer.innerHTML = banterHTML;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    };    
    
    var sendMessage = function( nick, url ) {
        var message = {
        	nickname: nick,
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
        ctx.fillRect(0,0,system.canvasWidth,system.canvasHeight)
        
	};


    
    /*** INIT ***/
    
    var init = (function() {
		initSocket();
    }());
    
};