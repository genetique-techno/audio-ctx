function PersistantThings( ctx ) {

  var width = ctx.canvas.width;
  var height = ctx.canvas.height;

  return {

    Circle: function( freqArray, bin ) {
      var inValue = freqArray[bin];
      var xPos = bin/freqArray.length*width + 1/(freqArray.length*2)*width;
      var yPos = 0;
      var radius = inValue / 5;
      var color = 'rgb('+ 10 +', '+ Math.min( parseInt( inValue*0.80 ), 255 ) +', ' + Math.min( parseInt( inValue*1.5 ), 255 ) + ')';
      var t = 0;

      return {
        clear: false,
        animate: function() {

          yPos += 1.2*t^2;
          t++;

          ctx.moveTo( xPos, yPos );
          ctx.beginPath();
          ctx.arc( xPos, yPos, radius, Math.PI*2, false );
          ctx.stroke();
          ctx.fillStyle = color;
          ctx.fill();

          if ( yPos > height + radius ) {
            this.clear = true;
          }
        }

      }
    }
  }

}
