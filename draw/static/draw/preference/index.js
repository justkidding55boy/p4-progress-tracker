
    var tool = new paper.Tool();
    var path;
    var colors = ['red', 'blue', 'pink', 'purple', 'orange', 'green',
                  'skyblue', 'navy', 'lime', 'aqua', 'fuchsia', 'olive'
                 , 'maroon'];

    var getColor = function() {
      var i = 0;
      do {

        user_id = Math.floor(Math.random() * colors.length);
        console.log(i);
        i++;
        //user_historyに見つけられなくなるまで続ける
        //user_historyになかったら終わり
      } while( i<20 || user_history.indexOf(user_id) !== -1);
    }
    
    getColor();

    var paths = [];
  
     tool.onMouseDown = function(event) {
          if (path) {
            path.selected = false;
          }

          path = new paper.Path({
            segments: [event.point],
            strokeWidth: 10,
//             strokeColor: 'blue',
            fullySelected: true
          });
       
       paths.push(path);
       
       path.strokeColor = colors[user_id];
       
        }
     
      tool.onMouseDrag = function(event) {
        path.add(event.point);
        var segment_list = [];
        for (var i = 0; i < path.segments.length; i++) {
          segment_list.push(path.segments[i].point.x);
          segment_list.push(path.segments[i].point.y);
          segment_list.push(user_id);
        }
        
//         console.log(segment_list);
        
         socket.send(segment_list);
      }

      tool.onMouseUp = function(event) {
        path.fullySelected = true;
        //send the path as json to the server
//         var segment_list = [];
//         for (var i = 0; i < path.segments.length; i++) {
//           segment_list.push(path.segments[i].point.x);
//           segment_list.push(path.segments[i].point.y);
//           segment_list.push(user_id);
//         }
        
// //         console.log(segment_list);
        
//          socket.send(segment_list);
      }
      
      var erasePath = function() {
        
          for (var i = 0; i < paths.length; i++) {
          paths[i].removeSegments();
//           paths[i].opacity = '0';
          console.log(i);
//           console.log(paths[i]);
        }
        
      }
      
      $('.erase-btn').click(function() {
        console.log("clicked");
//         console.log(path.segments);
//         path.opacity('0');
//         console.log(paths.length);
        erasePath();
        
      });

   window.addEventListener('devicemotion', function(event) {
//      console.log(event.acceleration.x + ' m/s2');
//      socket.send(event.acceleration.x);
     
     var acc = Math.abs(event.acceleration.x) + Math.abs(event.acceleration.y);
     
     if (acc > 20)  {
       socket.send('above 10');
        erasePath();
     }
     
   });

		window.addEventListener('deviceorientation', (event) => {
//       socket.send(event.beta);
      console.log(event.gamma);
      if (event.gamma > 30) {
        getColor();
      }
		});
  
      

  
    
    

  
    
