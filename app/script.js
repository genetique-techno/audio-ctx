
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

updateFrequencyAnalyser( frequencyAnalyser );
var maxValue = 0;
var upper = parseInt(4/16*frequencyAnalyser.__freqArray.length);
var lower = parseInt(0/16*frequencyAnalyser.__freqArray.length);

updateWaveformAnalyser( waveformAnalyser );





var things = new PersistantThings( ctx );
var drawStack = [];
var now = Date.now();

function draw() {

  delta = ( Date.now() - now ) / 1000;
  now = Date.now();

  requestAnimationFrame( draw );

  ctx.clearRect( 0, 0, window.innerWidth, window.innerHeight );
  ctx.save()


  updateFrequencyAnalyser( frequencyAnalyser );
  var displayArray = Array.from( frequencyAnalyser.__freqArray ).slice(lower, upper );

  updateWaveformAnalyser( waveformAnalyser );

  // shell.animate( displayArray );
  // hBars.animate( displayArray );
  // splitBars.animate( displayArray );
  // hWave.animate( waveformAnalyser.__waveArray );


  frequencyAnalyser.__freqArray.forEach( function( amp, bin, arr ) {
    if ( amp > 50 ) {
      drawStack.push( new things.Circle( arr, bin ) );
    }
  });

  animateStack( delta );
  drawStack = cleanDrawStack();

  ctx.restore();
}

function animateStack( delta ) {
  drawStack.forEach( function( thing ) {
    thing.animate( delta );
  });
}

function cleanDrawStack() {
  return drawStack.filter( function( thing ) {
    return thing.clear === false;
  });
}
