

  
      // setting up the canvas and one paper tool
    var canvas = document.getElementById('myCanvas');
//     var cvs = document.getElementById('myCanvasForImage');
    var ctx = canvas.getContext("2d");

    paper.setup(canvas);



  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var img;
    var img_url;

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
          console.log(e.target.result);
          img_url = e.target.result;
          img = new Image();
          img.src = img_url;
          console.log(img_url);
          img.onload = function(){
            ctx.drawImage(img, 0, 0);
          }
          
        };
      })(f);
      
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


  var tool = new paper.Tool();
    var path;

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
       
       path.strokeColor = 'red';
       
        }
     
      tool.onMouseDrag = function(event) {
        path.add(event.point);

      }

      tool.onMouseUp = function(event) {
        path.fullySelected = true;
      }
      
      var erasePath = function() {
        
          for (var i = 0; i < paths.length; i++) {
          paths[i].removeSegments();
//           paths[i].opacity = '0';
          console.log(paths[i]);
//           console.log(paths[i]);
        }
        
      }
      
      $('.erase-btn').click(function() {
        console.log("erase");

        erasePath();
        
      });

      $('.undo-btn').click(function(){
        console.log('undo');
        paths[paths.length-1].removeSegments();
      });

    $('.upload-btn').click(function(){
      $('.upload-tool').css('display', 'block');
    });

