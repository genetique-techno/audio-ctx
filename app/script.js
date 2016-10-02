
var audio = document.querySelector( 'audio' );
var audioCtx = new ( window.AudioContext || window.webkitAudioContext )();
var frequencyAnalyser = newFrequencyAnalyser( audioCtx, 128, 0.85 );
createAudioSource( audioCtx ).then( connect( frequencyAnalyser ) ).then( draw.bind( window ) );

var canvas = document.getElementById('draw');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');

var shell = new Shell( ctx );
var hBars = new HBars( ctx );

updateFrequencyAnalyser( frequencyAnalyser );
var maxValue = 0;
var upper = parseInt(4/16*frequencyAnalyser.__freqArray.length);
var lower = parseInt(0/16*frequencyAnalyser.__freqArray.length);

function draw() {

  requestAnimationFrame( draw );

  ctx.clearRect( 0, 0, window.innerWidth, window.innerHeight );
  ctx.save()


  updateFrequencyAnalyser( frequencyAnalyser );
  var displayArray = Array.from( frequencyAnalyser.__freqArray ).slice(lower, upper );

  shell.animate( displayArray );
  // hBars.animate( displayArray );


  ctx.restore();
}
