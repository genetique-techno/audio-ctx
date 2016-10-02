
var audio = document.querySelector( 'audio' );
var audioCtx = new ( window.AudioContext || window.webkitAudioContext )();
var frequencyAnalyser = newFrequencyAnalyser( audioCtx );
createAudioSource( audioCtx ).then( connect( frequencyAnalyser ) ).then( draw );
// make source return a promise.then(setup all connections).then(call draw)


var canvas = document.getElementById('draw');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Make a canvas
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(200, 0, 0)';

function animate( inArr ) {
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


frequencyAnalyser.fftSize = 128;
var freqArray = new Uint8Array( frequencyAnalyser.frequencyBinCount );
frequencyAnalyser.getByteFrequencyData( freqArray );
frequencyAnalyser.minDecibels = -90;
frequencyAnalyser.maxDecibels = -10;
frequencyAnalyser.smoothingTimeConstant = 0.85;

var maxValue = 0;
console.log(freqArray.length);
var upper = parseInt(4/16*freqArray.length);
var lower = parseInt(0/16*freqArray.length);



function draw() {

  requestAnimationFrame( draw );



  frequencyAnalyser.getByteFrequencyData( freqArray );
  readout.innerHTML = freqArray;
  var displayArray = Array.from( freqArray ).slice(lower, upper );
  console.log(displayArray.length);

  animate( displayArray );
}
