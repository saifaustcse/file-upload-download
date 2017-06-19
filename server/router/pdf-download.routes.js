/** API path that will download the pdf files */
// expose the routes to our app with module.exports
var fs = require('fs');

module.exports = function (app) {
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
}
