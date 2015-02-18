var repository = require('./repository');

var repositoryCallback = function(res){
    return function(err, data){
        res.json(err || data);
    };
};

var renderCallback = function(res){
    return function(err, data){
        res.render('document', { content: JSON.stringify(data) })
    };
};


module.exports = function(app){
    app.route('/')
    .get(function(req, res){
        res.render('document', { content: '' });
    })
    .post(function(req, res){
        //Only create if we have text
        req.accepts('application/json');
        if(req.body.hasOwnProperty('text') && 
           req.body.text.length > 0){
            repository.create(
                'document',
                { text: req.body.text },
                repositoryCallback(res));

        }else{
            res.status(400)
                .json({'Error': 'The document cannot be saved because there is nothing in it.'});
        }
    });

    app.route('/:id')
        .get(function(req, res){
            req.accepts('html');
            repository.get(
                'document', 
                req.params.id, 
                renderCallback(res));
        })
        // Get specific resource
        .get(function(req, res){
            req.accepts('application/json');
            repository.get(
                'document', 
                req.params.id, 
                repositoryCallback(res));
        })
        //Delete specific resource
        .delete(function(req, res){
            repository.delete(
                'document',
                req.params.id,
                repositoryCallback(res));
        })
        .put(function(req, res){
            req.accepts('application/json');
            req.body.id = req.params.id;
            repository.update(
                'document',
                req.body,
                repositoryCallback(res));
        });
};
