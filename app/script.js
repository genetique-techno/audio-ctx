var audio = document.querySelector( 'audio' );
var readout = document.getElementById('readout');
var audioCtx = new ( window.AudioContext || window.webkitAudioContext )();
var analyser = audioCtx.createAnalyser();
var source;

navigator.getUserMedia({ audio: true }, (stream) => {

  source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

}, (err) => {
  console.log( 'Error occurred: ', err );
} );

analyser.fftSize = 32;
var dataArray = new Uint8Array( analyser.frequencyBinCount );

analyser.getByteFrequencyData( dataArray );
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

function draw() {

  drawVisual = requestAnimationFrame( draw );

  analyser.getByteFrequencyData( dataArray );
  readout.innerHTML = dataArray;

}

draw();
