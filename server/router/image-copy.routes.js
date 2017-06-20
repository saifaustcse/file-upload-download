
/** API path that will download the pdf files */
// expose the routes to our app with module.exports
var fs = require('fs');

module.exports = function (app) {
    app.get('/copy', function (req, res) {
        //var source = pdfSource + NonValidateSchool;
        var source = 'C:/Demo Project/image-upload-download/assets/images/Test/school_b1.jpg';
        var destination = 'C:/Demo Project/image-upload-download/assets/images/TestNew/school_b1.jpg';

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
}