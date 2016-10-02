function colorShader( inValue ) {
  return 'rgb('+ 10 +', '+ parseInt(inValue*0.40) +', ' +parseInt(inValue*0.95) + ')';
}

function Shell( ctx ) {
  if ( !ctx ) { return console.log( 'ERROR: No canvas context passed to Shell' ); }
  var width = ctx.canvas.width - 2;
  var height = ctx.canvas.height - 2;
  var signalHeight = 200;

  return {

    animate: function( inArr ) {
      var split = Math.PI * 2 / inArr.length;
      var rad = [];
      inArr.forEach( function( f, i, arr ) {
        rad.push( split * i );
      });

      var cx = width/2;
      var cy = height/2;


      ctx.moveTo(cx, cy);

      for (var i = 0; i < inArr.length; i++) {

        var radius = inArr[i] / signalHeight * width / 2;

        var endAngle;
        if ( i === inArr.length - 1) {
          endAngle = Math.PI*2;
        } else {
          endAngle = rad[i+1];
        }
        ctx.beginPath();
        ctx.lineTo( cx + radius*Math.cos(rad[i]), cy + radius*Math.sin(rad[i]) );
        ctx.arc(cx, cy, radius, rad[i], endAngle);
        ctx.lineTo( cx, cy );
        ctx.stroke();
        ctx.fillStyle = colorShader( inArr[i] );
        ctx.fill();
        ctx.closePath();

      }
    }
  };
}

function HBars( ctx ) {
  if ( !ctx ) { return console.log( 'ERROR: No canvas context passed to HBars' ); }
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;;
  var signalHeight = 200;

  return {

    animate: function( inArr ) {

      var boxWidth = width / inArr.length;

      var split  = [];
      inArr.forEach( function( f, i, arr ) {
        split.push( width / arr.length * i );
      });

      for (var i = 0; i < inArr.length; i++) {
        if ( inArr[i] < 1 ) { continue; }

        var heightDec = inArr[i]/signalHeight*height;
        var revHeightDec = ( 1 - inArr[i]/signalHeight ) * height;

        ctx.beginPath();
        ctx.rect( split[i], revHeightDec, boxWidth, heightDec );
        ctx.stroke();
        ctx.fillStyle = colorShader( inArr[i] );
        ctx.fill();

      }

    }
  }
}

function SplitBars( ctx ) {
  if ( !ctx ) { return console.log( 'ERROR: No canvas context passed to SplitBars' ); }
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var signalHeight = 200;

  return {

    animate: function( inArr ) {

      var boxWidth = width / inArr.length;

      var split  = [];
      inArr.forEach( function( f, i, arr ) {
        split.push( width / arr.length * i );
      });

      for (var i = 0; i < inArr.length; i++) {
        if ( inArr[i] < 1 ) { continue; }

        var heightDec = inArr[i]/signalHeight*height;
        var revHeightDec = ( 1 - inArr[i]/signalHeight ) * height;

        ctx.beginPath();
        ctx.rect( split[i], revHeightDec / 2, boxWidth, heightDec );
        ctx.stroke();
        ctx.fillStyle = colorShader( inArr[i] );
        ctx.fill();

      }

    }
  }
}

function HWave( ctx ) {
  if ( !ctx ) { return console.log( 'ERROR: No canvas context passed to HWave' ); }
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var signalHeight = 256;

  return {

    animate: function( inArr ) {

      var segment = width / inArr.length;
      var splitSegment = segment / inArr.length;
      var split = [];
      inArr.forEach( function( f, i, arr ) {
        split.push( ( width / arr.length + splitSegment ) * i );
      });

      ctx.beginPath();

      for ( var i = 0; i < inArr.length; i++ ) {

        var heightDec = inArr[i]/signalHeight*height;
        if ( Math.abs( inArr[i] - signalHeight/2 ) < 2 ) { heightDec = height/2; }
        ctx.lineWidth = 2;
        ctx.strokeStyle = colorShader( inArr[i] );
        ctx.lineJoin = 'round';
        if ( i === 0 ) {
          ctx.moveTo( split[i], heightDec );
        } else {
          ctx.lineTo( split[i], heightDec );
        }
        ctx.stroke();

      }
    }
  }
}

