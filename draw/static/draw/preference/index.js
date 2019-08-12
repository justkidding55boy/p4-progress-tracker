var canvas = document.getElementById('myCanvas');
var cxt = canvas.getContext('2d');
var pen_check = 0;
var path_check = 0;
var erase_check = 0;

paper.setup(canvas);
var paths = [];
var paths_redo = [];

var draw = function(){
  var tool = new paper.Tool();
  var myPath;
  //used for eraser
  var _x;
  var _y;
  var  paintstat = false; 
 ////
  
  tool.onMouseDown = function(event) {
    if (pen_check == 0 && path_check == 1 && erase_check == 0) {
      //path
      console.log("path function");
      myPath = new paper.Path({
      strokeColor: 'red',
      strokeWidth: 5,
      strokeCap: 'round',
      dashArray: [10, 10]
    });

    } else if (pen_check == 1 && path_check == 0 && erase_check == 0) {
      //pen
      console.log("pen function");
      myPath = new paper.Path({
        strokeColor: 'black',
        strokeWidth: 2
      });
      
      //erase
    } else if (pen_check == 0 && path_check == 0 && erase_check == 1) {
      //erase 
      paintstat = true;
      _x = event.point.x;
      _y = event.point.y;
    }
     

  }

  tool.onMouseDrag = function(event) {
    
    if (pen_check == 0 && path_check == 1 && erase_check == 0) {
      //path
      myPath.add(event.point); 
    } else if (pen_check == 1 && path_check == 0 && erase_check == 0) {
      //pen
      myPath.add(event.point);
    } else if (pen_check == 0 && path_check == 0 && erase_check == 1) {
      //erase
      cxt.beginPath();
      point = event.point;
      cxt.moveTo(_x, _y);
      cxt.lineTo(point.x, point.y);
      cxt.stroke();
      _x = point.x;
      _y = point.y;
    }
  }
 
  tool.onMouseUp = function(event) {
    //arrow
    if (pen_check == 0 && path_check == 1 && erase_check == 0) {
      console.log(myPath);
      paths.push(myPath);
    } else if (pen_check == 1 && path_check == 0 && erase_check == 0) {
      paintstat = false;
    } else if (pen_check == 0 && path_check == 0 && erase_check == 1) {
      
    }

  }
}

function clear_c() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  cxt.beginPath();
  pen_check = 0;
  path_check = 0;
}

$('#pen').click(function(){
  console.log('pen clicked');
  pen_check = 1;
  path_check = 0;
  erase_check = 0;
//   cxt.linewidth = 30;
  cxt.globalCompositeOperation = 'source-over';
  cxt.lineWidth = 2;
  draw();
  
});

$('#path').click(function() {
  console.log("path clicked");
  pen_check = 0;
  path_check = 1;
  erase_check = 0;
  cxt.globalCompositeOperation = 'source-over';
  draw();
});

$('#erase').click(function() {
  pen_check = 0;
  path_check = 0;
  erase_check = 1;
  cxt.lineWidth = 30;
  cxt.globalCompositeOperation = "destination-out";
  
  draw();
});

$('.undo-icon').click(function() {
  console.log(paths);
  var target = paths[paths.length-1];
  target.removeSegments();
//   console.log("popinfo" +  paths.pop());
  paths_redo.push(target);
  paths.pop();
});

$('.redo-icon').click(function(){
  console.log("redo-click");
  var myPath = new paper.Path({
    strokeColor: 'red'
  });
  
  var target = paths_redo[paths_redo.length-1];

  paths_redo.pop();
  

});