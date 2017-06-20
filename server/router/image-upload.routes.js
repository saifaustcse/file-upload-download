var multer = require('multer');

module.exports = function (app) {
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, '../assets/uploads/');
        },
        filename: function (req, file, cb) {
            //var datetimestamp = Date.now();
            // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            console.log("file.originalname");
            console.log(file.originalname);
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
}
