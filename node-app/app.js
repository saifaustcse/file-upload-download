var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
//var fs = require('fs-extra');

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

/** Serving from the same express Server
No cors required */
app.use(express.static('../client'));
app.use(bodyParser.json());

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        //var datetimestamp = Date.now();
        // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        cb(null, file.originalname);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
});


/** API path that will download the pdf files */
app.get('/download', function (req, res) {
    //var source = pdfSource + NonValidateSchool;
    var source = 'C:/Demo Project/image-upload-download/assets/pds/NonValidateSchool.pdf';
    console.log(source);
    fs.readFile(source, function (error, data) {
        if (error) {
            console.log(error);
            res.json({ 'status': 'error', msg: err });
        } else {
            //res.writeHead(200, { "Content-Type": "application/pdf" });
            //res.write(data);
            //res.end();

            res.contentType("application/pdf");
            res.send(data);
            res.end();
        }
    });
});

/** API path that will download the pdf files */
app.get('/copy', function (req, res) {
    //var source = pdfSource + NonValidateSchool;
    var source = 'C:/Demo Project/image-upload-download/assets/images/Test/school_b1.jpg';
    var destination = 'C:/Demo Project/image-upload-download/assets/images/TestNew/school_b1.jpg';
  
    //var str = request.pathname;
    //var action = str.replace(/%20/g, " ");

    fs.readFile(source, function (err, data) {
        if (data) {
            fs.writeFile(destination, data, function (err) {
                if (err) {
                    res.json({ 'status': 'error', msg: err });
                }
                res.json({ 'status': 'success' });

            });
        }
        else {
            res.json({ 'status': 'error', msg: err });
        }
    });
});

app.listen('3001', function () {
    console.log('running on 3001...');
});