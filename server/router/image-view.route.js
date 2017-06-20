/** API path that will download the pdf files */
// expose the routes to our app with module.exports

var fs = require('fs'),
    url = require('url'),
    //dir = config.IMAGE_UPLOAD_PATH;
    dir = "C:\\Demo Project\\image-upload-download\\assets\\downloads\\";

module.exports = function (app) {
    app.get('/image/:model/:name', (req, res) => {

        var request = url.parse(req.url, true);

        //var str = request.pathname;
        //var action = str.replace(/%20/g, " ");

        //var action = decodeURI(request.pathname);
        //var model = decodeURL(req.params.model) + '/';
        //var name = decodeURI(req.params.name);

        var action = decodeURIComponent(request.pathname);
        var model = decodeURIComponent(req.params.model) + '/';
        var name = decodeURIComponent(req.params.name);

        if (action == ('/image/' + model + name)) {
            var img = fs.readFileSync(dir + model + name);
            if (img) {
                res.writeHead(200, { 'Content-Type': 'image/gif' });
                res.end(img, 'binary');
            }
            else {
                var img = fs.readFileSync(dir + 'nophoto.png');
                res.writeHead(200, { 'Content-Type': 'image/gif' });
                res.end(img, 'binary');
            }

        } else {
            var img = fs.readFileSync(dir + 'nophoto.png');
            res.writeHead(200, { 'Content-Type': 'image/gif' });
            res.end(img, 'binary');
        }
    })
}
