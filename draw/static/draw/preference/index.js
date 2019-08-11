var canvas = document.getElementById('myCanvas');
var cxt = canvas.getContext('2d');
var pen_check = 1;
var path_check = 0;
var erase_check = 0;
paper.setup(canvas);

var draw = function(){
  if (pen_check == 1) {
    console.log("pen");
    pen(cxt.globalCompositeOperation);
  } else if (path_check == 1) {
    console.log("path");
    path_c();
  } else if (erase_check == 1) {
    console.log("erase");
    erase();
  }
}

function pen(type) {
  console.log(type);
  
  var _x;
  var _y;
  var paintstat = false;

  var tool = new paper.Tool();
  tool.onMouseDown = function(event) {
    paintstat = true;
    _x = event.point.x
    _y = event.point.y;
  }

  tool.onMouseMove = function(event) {
    if (paintstat) {
      cxt.beginPath();
      //cxt.setLineDash([5, 15]);
      point = event.point;
      cxt.strokeStyle = "#000000";
      cxt.moveTo(_x, _y);
      cxt.lineTo(point.x, point.y);
      cxt.stroke();
      _x = point.x;
      _y = point.y;
    }
  }

    tool.onMouseUp = function(event) {
      paintstat = false;
    }

}

/*function eraser_c(){
  
}*/

var erase = function(){
  pen_check = 0;
  path_check = 0;
  //test
//   var _x;
//   var _y;
//   var paintstat = false;
//   var tool = new paper.Tool();
//   tool.onMouseDown = function(event) {
//     paintstat = true;
//     _x = event.point.x;
//     _y = event.point.y;
//     cxt.save();
    cxt.globalCompositeOperation = 'destination-out';
//     cxt.strokeStyle = "red";
//     cxt.moveTo(_x, _y);
//     cxt.lineTo(_x, _y);
//     cxt.lineWidth = 2;
//     cxt.stroke();
//   }
  
//   tool.onMouseDrag = function(event) {
//     paintstat = true;
//     _x = event.point.x;
//     _y = event.point.y;
//     cxt.save();
//     cxt.globalCompositeOperation = 'destination-out';
//     cxt.strokeStyle = "red";
//     cxt.moveTo(_x, _y);
//     cxt.lineTo(_x, _y);
//     cxt.lineWidth = 2;
//     cxt.stroke();
//   }
}

function clear_c() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  cxt.beginPath();
  pen_check = 0;
  path_check = 0;
}


function path_c() {
  var _x;
  var _y;
  var paintstat = false;
  var tool = new paper.Tool();
  tool.onMouseDown = function(event) {
    paintstat = true;
    _x = event.point.x
    _y = event.point.y;
  }

  tool.onMouseMove = function(event) {
    if (paintstat) {
      cxt.beginPath();
      cxt.setLineDash([5, 15]);
      point = event.point;
      cxt.strokeStyle = "#000000";
      cxt.moveTo(_x, _y);
      cxt.lineTo(point.x, point.y);
      cxt.lineWidth = 2;
      cxt.stroke();
      _x = point.x;
      _y = point.y;
    }
  }

  tool.onMouseUp = function(event) {
    paintstat = false;
  }
}

$('#pen').click(function(){
  pen_check = 1;
  path_check = 0;
  cxt.linewidth = 2;
  cxt.globalCompositeOperation = 'source-over';
  draw();
});

$('#path').click(function(){
  pen_check = 0;
  path_check = 1;
  draw();
});

$('#erase').click(function(){
  pen_check = 0;
  path_check = 0;
  erase_check = 1;
  cxt.linewidth = 10;
  cxt.globalCompositeOperation = "destination-out";
  cxt.linewidth = 10;
  draw();
});
