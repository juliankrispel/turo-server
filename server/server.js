var ejs = require('ejs');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var repository = require('./repository');
var routes = require('./routes');
var multer = require('multer');

module.exports = function(port){
    // view engine
    app.engine('.html', ejs.__express);
    app.set('views', path.join(__dirname, '../public/templates'));
    app.set('view engine', 'html');
    console.log(app.get('view engine'));

    // for static files
    //app.use(express.static(path.join(__dirname, '/../node_modules/turo-desktop/public')));

    // for parsing application/json
    app.use(bodyParser.json()); 

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // for parsing multipart/form-data
    app.use(multer());

    // Listen for requests
    app.listen(port);

    // Set up routes
    routes(app);

    // Return server object
    return app;
};
