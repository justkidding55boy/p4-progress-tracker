   
  
    // getting the URL (you may want to use for Exercise 3)
    var url = window.location.href;

    var socket = new WebSocket(
        'wss://p3-websockets-justkidding55boy-eijikudo883404.codeanyapp.com/ws/draw');
    
    // notify console if socket closes unexpectedly
    socket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };
  
      // setting up the canvas and one paper tool
    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);


var rangeRndm = function(min, max) {
      if (max) {
        return Math.random()*(max-min+1) + min;
      } else {
        return Math.random()*min;
      }
    };


function hsl2rgb (h, s, l ) {

	var max = l + ( s * ( 1 - Math.abs( ( 2 * l ) - 1 ) ) / 2 );
	var min = l - ( s * ( 1 - Math.abs( ( 2 * l ) - 1 ) ) / 2 );

	var rgb;
	var i = parseInt( h / 60 );

	switch( i ) {
		case 0:
		case 6:
			rgb = [ max, min + (max - min) * (h / 60), min ];
		break;

		case 1:
			rgb = [ min + (max - min) * (120 - h / 60), max, min ];
		break;

		case 2:
			rgb = [ min, max, min + (max - min) * (h - 120 / 60) ];
		break;

		case 3:
			rgb = [ min, min + (max - min) * (240 - h / 60), max ];
		break;

		case 4:
			rgb = [ min + (max - min) * (h - 240 / 60), min, max ];
		break;

		case 5:
			rgb = [ max, min, min + (max - min) * (360 - h / 60) ];
		break;
	}

	return rgb.map( function ( value ) {
		return value * 255;
	} );
}