var repository = require('./repository');

var repositoryCallback = function(res){
    return function(err, data){
        res.json(err || data);
    };
};

module.exports = function(app){
    app.route('/')
    //.get(function(req, res){
    //    res.json({b: 'default'});
    //})
    //Save new document
    .post(function(req, res){
        //Only create if we have text
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
        // Get specific resource
        .get(function(req, res){
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
            req.body.id = req.params.id;
            repository.update(
                'document',
                req.body,
                repositoryCallback(res));
        });
};
