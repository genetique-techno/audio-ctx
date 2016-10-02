function Shell( ctx ) {

  if ( !ctx ) { return console.log( 'ERROR: No canvas context passed to Shell' ) };

  return {

    animate: function( inArr ) {
      ctx.clearRect( 0, 0, window.innerWidth, window.innerHeight );

      ctx.save()

      var split = Math.PI * 2 / inArr.length;
      var rad = [];
      inArr.forEach( function( f, i, arr ) {
        rad.push( split * i );
      });

      var cx = 200;
      var cy = 200;


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

      ctx.restore();
    }
  };
}
