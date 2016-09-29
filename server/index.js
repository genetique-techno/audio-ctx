"use strict";

var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 8600;

app.use( express.static( 'app' ) );
app.listen( port, () => console.log( `Listening on port ${port}!`) );
