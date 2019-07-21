var user_color;
      // getting the URL (you may want to use for Exercise 3)
    var url = window.location.href;
    var url_large = false;
    var url_small = false;
    var url_normal = false;

			if (url.indexOf("large") > -1) {
				url_large = true;
        $('.display_size').text('large');
			} else if (url.indexOf("small") > -1){
				url_small = true;
        $('.display_size').text('small');
			} else {
        url_normal = true;
        $('.display_size').text('normal');
      }


    var socket = new WebSocket(
        'wss://p3-websockets-justkidding55boy-eijikudo883404.codeanyapp.com/ws/draw');
    
    // notify console if socket closes unexpectedly
    socket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };

////////// receive/
  //////////
  //////////
  socket.onmessage = function(msg) {
    
      console.log(msg);
    
      
      var segmentList = msg.data.split(",");
      
      var tmp = new paper.Path();
      
      for(var i = 0; i < segmentList.length-1; i+=3) {
        var x = parseInt(segmentList[i], 10);
        var y = parseInt(segmentList[i+1], 10);
        var tmp_usrID = parseInt(segmentList[i+2], 10);
        tmp.strokeColor = colors[tmp_usrID];
        
        if (user_history.indexOf(tmp_usrID) === -1)  {
          user_history.push(tmp_usrID);
        }
       
        
       if (url_small) {
          return 
       }
        
        var p = new paper.Point(x, y);
        tmp.add(p);
      }
    }
  
  
  
  
  ////////////
  ///////////
  /////////////receive

