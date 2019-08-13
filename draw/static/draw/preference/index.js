var canvas = document.getElementById('myCanvas');
var cxt = canvas.getContext('2d');
var cond = "pen";

paper.setup(canvas);
var paths = [];
var paths_blur = [];
var paths_redo = [];
var action_history = [];

var draw = function() {
  
  var tool = new paper.Tool();
  var myPath;
  var myPath_blur;
  //used for eraser
  var _x;
  var _y;
  ////
  var blur_check = false;

  tool.onMouseDown = function(event) {
    
    if (cond =="path") {
      //path
      
      console.log("path function");

      myPath = new paper.Path({
        strokeColor: 'red',
        strokeWidth: 5,
        strokeCap: 'round',
        dashArray: [10, 10]
      });
//       my_history.saveState(this.canvas);
      action_history.push("path");

    } else if (cond == "pen") {
      //pen
      console.log("pen function");
      myPath = new paper.Path({
        strokeColor: 'black',
        strokeWidth: 2
      });

      action_history.push("pen");
      
    } else if (cond == "erase") {
      //erase 
      paintstat = true;
      _x = event.point.x;
      _y = event.point.y;
      
    } else if (cond == "blurry") {
      _x = event.point.x;
      _y = event.point.y;
      console.log(event.point);
      blur_check = true;
      action_history.push("rect");
    }
    
    console.log(action_history);
  }

  tool.onMouseDrag = function(event) {

    if (cond == "path") {
      //path
      myPath.add(event.point);
    } else if (cond == "pen") {
      //pen
      myPath.add(event.point);
    } else if (cond == "erase") {
      //erase
      cxt.beginPath();
      point = event.point;
      cxt.moveTo(_x, _y);
      cxt.lineTo(point.x, point.y);
      cxt.stroke();
      _x = point.x;
      _y = point.y;
      
    } else if(cond == "blurry") {
      
      if (myPath_blur && blur_check) {
        myPath_blur.remove();
      }
      
      myPath_blur = new paper.Path.Rectangle({
        fillColor: 'yellow',
        from: [_x, _y],
        to: event.point,
        opacity: 0.2
      });
      
    }
  }

  tool.onMouseUp = function(event) {
    //arrow
    if (cond == "path") {
      paths.push(myPath);
    } else if (cond == "pen") {
//       paintstat = false;
      paths.push(myPath);
    } else if (cond == "erase") {

    } else if (cond == "blurry") {
      
      if (myPath_blur && blur_check) {
        myPath_blur.remove();
      }
      myPath = new paper.Path.Rectangle({
        fillColor: 'yellow',
        from: [_x, _y],
        to: event.point,
        opacity: 0.2
      });
      paths_blur.push(myPath);
      blur_check = false;
    }
  }
}

function clear_c() {
//   cxt.clearRect(0, 0, canvas.width, canvas.height);
//   cxt.beginPath();
//   pen_check = 0;
//   path_check = 0;
  for (var i = 0; i < paths.length; i++) {
    paths[i].removeSegments();
  }
  
  for (var i = 0; i < paths_blur.length; i++) {
    paths_blur[i].remove();
  }
  
  document.getElementById("clear").style.color="#ffff88";
  document.getElementById("pen").style.color="#B5D3E7";
  document.getElementById("highlight").style.color="#B5D3E7";
  document.getElementById("path").style.color="#B5D3E7";
  document.getElementById("undo").style.color="#B5D3E7";
  document.getElementById("audio").style.color="#B5D3E7";
}

$('#pen').click(function() {
  console.log('pen clicked');
  cond = "pen";
  //   cxt.linewidth = 30;
  cxt.globalCompositeOperation = 'source-over';
  cxt.lineWidth = 2;
  draw();
 document.getElementById("pen").style.color="#ffff88";
  document.getElementById("path").style.color="#B5D3E7";
  document.getElementById("highlight").style.color="#B5D3E7";
  document.getElementById("clear").style.color="#B5D3E7";
  document.getElementById("undo").style.color="#B5D3E7";
  document.getElementById("audio").style.color="#B5D3E7";
 

});

$('#path').click(function() {
  console.log("path clicked");
  cond = "path";
  cxt.globalCompositeOperation = 'source-over';
  draw();
  
  document.getElementById("path").style.color="#ffff88";
  document.getElementById("pen").style.color="#B5D3E7";
  document.getElementById("highlight").style.color="#B5D3E7";
  document.getElementById("clear").style.color="#B5D3E7";
  document.getElementById("undo").style.color="#B5D3E7";
  document.getElementById("audio").style.color="#B5D3E7";
});

// $('#erase').click(function() {
//   cond = "erase";
//   cxt.lineWidth = 30;
//   cxt.globalCompositeOperation = "destination-out";
//   draw();
// });

$('#undo').click(function() {

  console.log(paths_blur);
//   target.remove();
  var target_type = action_history[action_history.length-1];
  action_history.pop();
 
  var target;
  if (target_type == "rect") {
    target = paths_blur[paths_blur.length - 1];
    target.remove();
    paths_blur.pop();
  } else {
    target = paths[paths.length - 1];
    target.removeSegments();
    paths.pop();
    console.log("length" + paths.length);
  }
  document.getElementById("undo").style.color="#ffff88";
  document.getElementById("pen").style.color="#B5D3E7";
  document.getElementById("highlight").style.color="#B5D3E7";
  document.getElementById("clear").style.color="#B5D3E7";
  document.getElementById("path").style.color="#B5D3E7";
  document.getElementById("audio").style.color="#B5D3E7";
});

$('.redo-icon').click(function() {
  console.log("redo-click");
  var myPath = new paper.Path({
    strokeColor: 'red'
  });

  var target = paths_redo[paths_redo.length - 1];
  myPath.add(target);

  paths_redo.pop();
//   my_history.redo(canvas, cxt);

});

$('#audio').click(function(){
    $('#audio').css("display", "none");
    $('#stop').css("display", "block");
});

$('#stop').click(function(){
   $('#stop').css("display", "none");
});

$('#highlight').click(function(){
  console.log("blurry clicked");
  cond = "blurry";
  draw();
  document.getElementById("highlight").style.color="#ffff88";
  document.getElementById("pen").style.color="#B5D3E7";
  document.getElementById("path").style.color="#B5D3E7";
  document.getElementById("clear").style.color="#B5D3E7";
  document.getElementById("undo").style.color="#B5D3E7";
  document.getElementById("audio").style.color="#B5D3E7";
});