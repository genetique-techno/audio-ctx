function PersistantThings( ctx, analyser, ThingConstructor, thresholdVal ) {
  if ( !ctx ) { return console.log( 'ERROR: No context passed to PersistantThings' ) }
  if ( !analyser ) { return console.log( 'ERROR: No analyser passed to PersistantThings' ) }

  return {
    drawStack: [],
    width: ctx.canvas.width,
    height: ctx.canvas.height,

    draw: function( delta ) {

      analyser.__array.forEach( ( amp, bin, arr ) => {
        if ( amp > thresholdVal ) {
          this.drawStack.push( new this.Thing( ctx, arr, bin ) );
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

    Thing: ThingConstructor.bind( this )
  }

}

function CircleConstructor( ctx, inArr, bin ) {
  var inValue = inArr[bin];
  var xPos = bin/inArr.length*ctx.canvas.width + 1/(inArr.length*2)*ctx.canvas.width;
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

      if ( yPos > ctx.canvas.height + radius ) {
        ctx.canvas.clear = true;
      }
    }

  }
}
