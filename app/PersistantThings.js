function PersistantThings( ctx, analyser, thresholdVal ) {
  if ( !ctx ) { return console.log( 'ERROR: No context passed to PersistantThings' ) }
  if ( !analyser ) { return console.log( 'ERROR: No analyser passed to PersistantThings' ) }

  var width = ctx.canvas.width;
  var height = ctx.canvas.height;

  return {
    drawStack: [],

    draw: function( delta ) {

      analyser.__array.forEach( ( amp, bin, arr ) => {
        if ( amp > thresholdVal ) {
          this.drawStack.push( new this.Thing( arr, bin ) );
        }
      });

      this.animateStack();
      this.drawStack = this.cleanDrawStack();
    },

    animateStack: function( delta ) {
      this.drawStack.forEach( function( thing ) {
        thing.animate( delta );
      });
    },

    cleanDrawStack: function() {
      return this.drawStack.filter( function( thing ) {
        return thing.clear === false;
      });
    },

    Thing: function( inArr, bin ) {
      var inValue = inArr[bin];
      var xPos = bin/inArr.length*width + 1/(inArr.length*2)*width;
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

