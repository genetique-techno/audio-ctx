function Shell( ctx ) {
  if ( !ctx ) { return console.log( 'ERROR: No canvas context passed to Shell' ); }

  return {

    animate: function( inArr ) {
      var split = Math.PI * 2 / inArr.length;
      var rad = [];
      inArr.forEach( function( f, i, arr ) {
        rad.push( split * i );
      });

      var cx = ctx.canvas.width/2;
      var cy = ctx.canvas.height/2;


      ctx.moveTo(cx, cy);

      for (var i = 0; i < inArr.length; i++) {

        var radius = inArr[i]/2 + 50;

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
        ctx.fillStyle = 'rgb('+ 10 +', '+ parseInt(inArr[i]*0.40) +', ' +parseInt(inArr[i]*0.80) + ')';
        ctx.fill();
        ctx.closePath();

      }
    }
  };
}

function HBars( ctx ) {
  if ( !ctx ) { return console.log( 'ERROR: No canvas context passed to HBars' ); }
  var padding = 20;
  var width = ctx.canvas.width - 2*padding;
  var height = ctx.canvas.height - 2*padding;;
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
        ctx.rect( padding + split[i], padding + revHeightDec, boxWidth, heightDec );
        ctx.stroke();
        ctx.fillStyle = 'rgb('+ 10 +', '+ parseInt(inArr[i]*0.40) +', ' +parseInt(inArr[i]*0.80) + ')';
        ctx.fill();

      }

    }
  }
}
