window.onload = function() {
    
    var messageContainer,
    	messageForm,
        nickname,
        imgURL, 
        socket, 
        banter,
        $canvas,
        ctx;
        
    var pixel = {
	    size: '5px',
	    color: '#000'
    }
        
    var copy = {
	    disconnected: 'You have been disconnected.',
    };
        
    var system = {
    	io: 'http://localhost:3000',
        name: 'pixelChat',
    };
    	
    
    /*** INIT SOCKETS AND CHAT ***/

    var initpixelChat = function() {
        
        /*** pixelChatroom and its events ***/
        messageContainer = document.getElementById('pixelChat-messages');
        messageForm = document.forms[0];
        banter = [];

		// canvas stuff 
		$canvas = $('canvas');
        ctx = $canvas[0].getContext("2d");
        
		$canvas.mousedown(onPenDown).mouseup(onPenUp);
        
        // submit form event
        document.forms[0].onsubmit = function() {
            nickname = messageForm.nickname.value;
            if ( !nickname ) {
	            alert("you must enter a nickname, sorry not sorry");
	            return false;
            }
            
			// todo get actual canvas url 
			imgURL = "lol.png";
			
        	sendMessage( nickname, imgURL );
			resetCanvas()
            return false;
        };

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
            document.forms[0].getElementsByTagName('label')[0].innerText = copy.disconnected;
            //todo hide form and show alert on disconnect         
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
		
		var canvasPosition = $canvas.position();
		var formPosition = $(messageForm).position();
		
console.log(canvasPosition);
		xPos = e.pageX - canvasPosition.left + formPosition.left;
		yPos = e.pageY - canvasPosition.top + formPosition.top;
		
		console.log(yPos + ' ' + xPos);

		ctx.beginPath();  
	    xPos = ( Math.ceil(xPos/pixel.size) * pixel.size ) - pixel.size;
	    yPos = ( Math.ceil(yPos/pixel.size) * pixel.size ) - pixel.size;
		ctx.moveTo (xPos, yPos);          
		ctx.fillStyle = pixel.color;
		ctx.lineHeight = 0;
		ctx.fillRect(xPos,yPos,pixel.size,pixel.size);
	};
    
    var resetCanvas = function() {
		ctx.clearRect(0, 0, $canvas.width(), $canvas.height());	
	};


    
    /*** INIT ***/
    
    var init = (function() {
		initSocket();
    }());
    
};