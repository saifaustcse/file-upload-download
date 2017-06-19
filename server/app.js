var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var fs = require('fs');
//var multer = require('multer');

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

/** Serving from the same express Server no cors required */
app.use(express.static('../client'));
app.use(bodyParser.json());

// routes ======================================================================
require('./router/image-upload.routes')(app);
require('./router/image-copy.routes')(app);
require('./router/pdf-download.routes')(app);


app.listen('3001', function () {
    console.log('running on 3001...');
});