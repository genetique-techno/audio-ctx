
var audio = document.querySelector( 'audio' );
var audioCtx = new ( window.AudioContext || window.webkitAudioContext )();
var frequencyAnalyser = newFrequencyAnalyser( audioCtx, 128, 0.85 );
createAudioSource( audioCtx ).then( connect( frequencyAnalyser ) ).then( draw );

var canvas = document.getElementById('draw');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');

var shell = new Shell( ctx );

updateFrequencyAnalyser( frequencyAnalyser );
var maxValue = 0;
console.log(frequencyAnalyser.__freqArray.length);
var upper = parseInt(4/16*frequencyAnalyser.__freqArray.length);
var lower = parseInt(0/16*frequencyAnalyser.__freqArray.length);

function draw() {

  requestAnimationFrame( draw );



  updateFrequencyAnalyser( frequencyAnalyser );
  var displayArray = Array.from( frequencyAnalyser.__freqArray ).slice(lower, upper );
  console.log(displayArray.length);

  shell.animate( displayArray );
}
