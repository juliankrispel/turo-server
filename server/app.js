var server = require('./server');

// Start mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/turo');

// Start server
console.log('serving at port 3000')
server(3000);
