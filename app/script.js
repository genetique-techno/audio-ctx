
var audio = document.querySelector( 'audio' );
var audioCtx = new ( window.AudioContext || window.webkitAudioContext )();
var frequencyAnalyser = newFrequencyAnalyser( audioCtx, 32, 0.85 );
var waveformAnalyser = newWaveFormAnalyser( audioCtx, 256, 0.85 );
createAudioSource( audioCtx ).then( connect( frequencyAnalyser ) ).then( connect( waveformAnalyser) ).then( draw.bind( window ) );

var canvas = document.getElementById('draw');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');

var shell = new Shell( ctx );
var hBars = new HBars( ctx );
var splitBars = new SplitBars( ctx );
var hWave = new HWave( ctx );

updateWaveformAnalyser( waveformAnalyser );
updateFrequencyAnalyser( frequencyAnalyser );
var maxValue = 0;
var upper = parseInt(4/16*frequencyAnalyser.__array.length);
var lower = parseInt(0/16*frequencyAnalyser.__array.length);

var things = new PersistantThings( ctx, frequencyAnalyser, CircleConstructor, 50 );
var now = Date.now();

function draw() {

  delta = ( Date.now() - now ) / 1000;
  now = Date.now();

  requestAnimationFrame( draw );

  ctx.clearRect( 0, 0, window.innerWidth, window.innerHeight );
  ctx.save()


  updateFrequencyAnalyser( frequencyAnalyser );
  var displayArray = Array.from( frequencyAnalyser.__array ).slice(lower, upper );

  updateWaveformAnalyser( waveformAnalyser );

  // shell.animate( displayArray );
  // hBars.animate( displayArray );
  // splitBars.animate( displayArray );
  // hWave.animate( waveformAnalyser.__array );

  things.draw( delta );



  ctx.restore();
}

