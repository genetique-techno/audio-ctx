var audio = document.querySelector( 'audio' );
var readout = document.getElementById('readout');
var smallReadout = document.getElementById('small-readout');
var audioCtx = new ( window.AudioContext || window.webkitAudioContext )();
var frequencyAnalyser = audioCtx.createAnalyser();
var waveformAnalyser = audioCtx.createAnalyser();
var source;

var canvas = document.getElementById('draw');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(30, 30, 50, 50);

//do stuff
// ctx.moveTo(x, y)
// ctx.arc(cx, cy, radius, startAngle, endAngle, CCW?)  Angles in rad
// ctx.arcTo(x1, y1, x2, y2, radians)
// ctx.rect(x, y, width, height)
// new Path2D([d or path object or empty]) - everything after is defined on this Path2D instance...then you can fill(Path2D) or stroke(Path2D)
// ctx.fill([obj])
// ctx.lineTo(x, y)
// ctx.fillStyle = color
// ctx.strokeStyle = color
// ctx.globalAlpha = alpha value - applies to all newly created shapes on the context
// ctx.lineWidth
// ctx.lineCap = ['butt', 'round', 'square']
// ctx.lineJoin = ['round', 'bevel', 'miter']
// ctx.miterLimit
// ctx.getLineDash()
// ctx.setLineDash( segments )
// ctx.lineDashOffset
//
// ctx.createLinearGradient(x1, y1, x2, y2)
// ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
// gradient.addColorStop(position, color)
//
// ctx.createPattern(image, type)
//
// shadowOffsetX = float
// shadowOffsetY = float
// shadowBlur = float
// shadowColor = color
//
// ctx.fillText(text, x, y [, maxWidth])
// ctx.strokeText(text, x, y [, maxWidth])
//
// ctx.save() - save canvas state onto stack
// ctx.restore() - pop canvas state from stack
//
// ctx.translate(x, y) - translate canvas coordinates without moving anything
// ctx.rotate(angle) - rotate canvas coords without moving anything
// ctx.scale(x, y)



var rad1 = 0;
var rad2 = 1;
var radius = 50;
var cx = 200;
var cy = 200;

ctx.beginPath();

ctx.moveTo(cx, cy);
ctx.lineTo( cx + radius*Math.cos(rad1), cy + radius*Math.sin(rad1) );
ctx.arc(cx, cy, radius, rad1, rad2);
ctx.lineTo( cx, cy );

ctx.stroke();
ctx.fillStyle = 'rgb(0, 200, 100)';
ctx.fill();
ctx.closePath();



// navigator.getUserMedia({ audio: true }, (stream) => {

//   source = audioCtx.createMediaStreamSource( stream );
//   source.connect( frequencyAnalyser );
//   frequencyAnalyser.connect( waveformAnalyser );

// }, (err) => {
//   console.log( 'Error occurred: ', err );
// } );

// frequencyAnalyser.fftSize = 32;
// var freqArray = new Uint8Array( frequencyAnalyser.frequencyBinCount );
// frequencyAnalyser.getByteFrequencyData( freqArray );
// frequencyAnalyser.minDecibels = -90;
// frequencyAnalyser.maxDecibels = -10;
// frequencyAnalyser.smoothingTimeConstant = 0.95;

// waveformAnalyser.fftSize = 1024;
// var waveArray = new Uint8Array( waveformAnalyser.frequencyBinCount );
// waveformAnalyser.getByteTimeDomainData( waveArray );
// waveformAnalyser.minDecibels = -90;
// waveformAnalyser.maxDecibels = -10;
// waveformAnalyser.smoothingTimeConstant = 0.85;

function draw() {

  requestAnimationFrame( draw );

  // frequencyAnalyser.getByteFrequencyData( freqArray );
  // readout.innerHTML = freqArray;

  // waveformAnalyser.getByteTimeDomainData( waveArray );
  // smallReadout.innerHTML = waveArray.join(' ');
}

draw();
