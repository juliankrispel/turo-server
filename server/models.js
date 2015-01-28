var mongoose = require('mongoose');
var ShortId = require('mongoose-shortid');

var documentSchema = mongoose.Schema({
    _id: {type: ShortId, index: true, len: 7, base: 64},
    text: String
});

var models = {
    document: mongoose.model('Document', documentSchema)
};

module.exports = models;
