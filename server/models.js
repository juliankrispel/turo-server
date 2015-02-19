var mongoose = require('mongoose');
var ShortId = require('mongoose-shortid');

var documentSchema = mongoose.Schema({
    _id: {type: ShortId, index: true, len: 7, base: 64},
    text: String
});

var userSchema = mongoose.Schema({
    name: String,
    token: String
});

var models = {
    document: mongoose.model('Document', documentSchema),
    user: mongoose.model('User', documentSchema)
};

module.exports = models;
