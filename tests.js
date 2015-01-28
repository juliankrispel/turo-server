var test = require('tap').test;
var mongoose = require('mongoose');
var request = require('request');
var server = require('./server/server');
mongoose.connect('mongodb://localhost/test');
var baseUrl = 'http://localhost:3000/';

//Example data
var exampleDocument = {text: '1 + 1 + 1'};
var exampleDocument2 = {text: '3 !'};

var exampleDocumentId;
var exampleDocument2Id;

test('start server', function(t){
    var s = server(3000);
    t.ok(s !== undefined, 'server started successfully');
    t.end();

    t.test('dropping db', function(){
        mongoose.connection.db.dropDatabase(function(err){
            t.ok(err === null, 'db dropped successfully, cleaned up at start');
            t.end();
        });
    });
});

test('REST CRUD for resources', function(t){
    t.test('create document resource', function(t){
        request.post(baseUrl, {form: exampleDocument}, 
            function(err, resp, body){ 
                body = JSON.parse(body);
                t.ok(err === null, 'document resource created');
                t.ok(body.text === exampleDocument.text, 
                    'document is saving correctly');
                exampleDocumentId = body._id;
                t.end();
            }
        );
    });

    t.test('create second document resource', function(t){
        request.post(baseUrl +'document', {form: exampleDocument2}, 
            function(err, resp, body){ 
                body = JSON.parse(body);
                t.ok(err === null, 'second document resource created');
                t.ok(body.text === exampleDocument2.name && body.description === exampleDocument2.description, 
                    'exampleDocument2 matches db record');
                exampleDocument2Id = body._id;
                t.end();
            }
        );
    });

    t.test('get all document resources', function(t){
        request.get(baseUrl + 'documents', function(err, resp, body){
            body = JSON.parse(body);
            t.ok(body.length === 2, 'db has correct amount of records');
            t.ok(err === null, 'request hasn\'t thrown errors');
            t.end();
        });
    });


    t.test('get document record', function(t){
        request.get(baseUrl + exampleDocumentId, function(err, resp, body){
            body = JSON.parse(body);
            t.ok(body.text === exampleDocument.text, 
                'fetched right document');
            t.ok(err === null, 'request hasn\'t thrown errors');
            t.end();
        });
    });

    t.test('update exampleDocument document record', function(t){
        request.put(baseUrl + exampleDocumentId, {form: {text: '1 - 321'}}, function(err, resp, body){
            body = JSON.parse(body);
            t.ok(body.text === '1 - 321', 
                'document correctly updated');
            t.ok(err === null, 'request hasn\'t thrown errors');
            t.end();
        });
    });

    t.test('delete exampleDocument document record', function(t){
        request.del(baseUrl + 'document/' + exampleDocumentId, function(err, resp, body){
            body = JSON.parse(body);
            t.ok(body === 1, '1 item has been deleted');
            t.ok(err === null, 'request has been deleted');
            t.end();
        });
    });

    t.test('correct count of entries after deletion', function(t){
        request.get(baseUrl + 'document', function(err, resp, body){
            body = JSON.parse(body);
            t.ok(body.length === 1, 'model count proves that deletion worked');
            t.end();
        });
    });
});

test('cleanup', function(t){
    mongoose.connection.db.dropDatabase(function(err){
        t.ok(err === null, 'db dropped successfully, cleanup completed');
        t.end();
    });
});
