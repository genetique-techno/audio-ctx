function createAudioSource( ctx ) {

  ctx = ctx || new ( window.AudioContext || window.webkitAudioContext )();
  if ( navigator.getUserMedia ) {

    return new Promise( function( resolve, reject ) {

      navigator.getUserMedia({ audio: true }, (stream) => {
        resolve( ctx.createMediaStreamSource( stream ) );
      }, (err) => {
        reject( err );
      });

    });

  } else {
    console.log( "ERROR: navigator.getUserMedia not found" );
    return null;
  }

}

function connect( audioNode ) {
  return function( source ) {
    source.connect( audioNode );
    return audioNode;
  }
}

function newFrequencyAnalyser( ctx, fftSize, smoothingTimeConstant ) {

  var frequencyAnalyser;
  if ( ctx ) {
    frequencyAnalyser = ctx.createAnalyser();
  } else {
    console.log( 'ERROR: No context passed to newFrequencyAnalyser' );
  }
  frequencyAnalyser.fftSize = fftSize;
  frequencyAnalyser.__array = new Uint8Array( frequencyAnalyser.frequencyBinCount );
  frequencyAnalyser.getByteFrequencyData( frequencyAnalyser.__array );
  frequencyAnalyser.minDecibels = -90;
  frequencyAnalyser.maxDecibels = -10;
  frequencyAnalyser.smoothingTimeConstant = smoothingTimeConstant;

  return frequencyAnalyser;
}

function updateFrequencyAnalyser( analyser ) {
  analyser.getByteFrequencyData( analyser.__array );
}

function newWaveFormAnalyser( ctx, fftSize, smoothingTimeConstant ) {

  var waveformAnalyser;
  if ( ctx ) {
    waveformAnalyser = ctx.createAnalyser();
  } else {
    console.log( 'ERROR: No context passed to newWaveFormAnalyser' );
    return null;
  }

  waveformAnalyser.fftSize = fftSize;
  waveformAnalyser.__array = new Uint8Array( waveformAnalyser.frequencyBinCount );
  waveformAnalyser.getByteTimeDomainData( waveformAnalyser.__array );
  waveformAnalyser.minDecibels = -90;
  waveformAnalyser.maxDecibels = -10;
  waveformAnalyser.smoothingTimeConstant = smoothingTimeConstant;

  return waveformAnalyser;
}

function updateWaveformAnalyser( analyser ) {
  analyser.getByteTimeDomainData( analyser.__array );
}
