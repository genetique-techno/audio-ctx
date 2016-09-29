
navigator.getUserMedia({ audio: true }, success, error );

function success( stream ) {
  var audio = document.querySelector( 'audio' );
  audio.src = window.URL.createObjectURL( stream );
}

function error( err ) {
  console.log( 'Error occurred: ', err );
}
