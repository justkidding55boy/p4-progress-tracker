
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
  
     tool.onMouseDown = function(event) {
          if (path) {
            path.selected = false;
          }

          path = new paper.Path({
            segments: [event.point],
//             strokeColor: 'blue',
            fullySelected: true
          });
       
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
      

  
    
    

  
    
