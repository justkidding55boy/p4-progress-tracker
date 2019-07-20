$(document).ready(function(){

    

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
    var tool = new paper.Tool();

  
//   tool.onMouseMove = function(event) {
//     path.position = event.point;
     var path;
  
     tool.onMouseDown = function(event) {
          if (path) {
            path.selected = false;
          }

          path = new paper.Path({
            segments: [event.point],
            strokeColor: 'black',
            fullySelected: true
          });
        }


      tool.onMouseDrag = function(event) {
        path.add(event.point);
      }

      tool.onMouseUp = function(event) {
        path.fullySelected = true;
        //send the path as json to the server
        var json = JSON.stringify(path.segments);
      
        socket.send(json);
      }
      
  
//       setTimeout(function() {
//       socket.send('I am Eiji');
//     }
//       , 1000);
  
    socket.onmessage = function(msg) {
      console.log("This is special" + msg); //prints message when receive
      var obj = JSON.parse(msg);
      console.log(obj);
      path.add(obj);
    }
  
    
});