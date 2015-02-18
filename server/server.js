var ejs = require('express-ejs-layouts');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var repository = require('./repository');
var routes = require('./routes');
var multer = require('multer');

module.exports = function(port){
    // view engine

    app.set('views', __dirname + '/../node_modules/turo-desktop/public/templates');
    app.set('view engine', 'ejs');
    app.use(ejs);

    // for static files
    app.use(express.static(__dirname + '/../node_modules/turo-desktop/public'));

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
