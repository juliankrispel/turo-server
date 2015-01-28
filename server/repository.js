var models = require('./models');

var repositoryAction = function(fn){
    var cb;
    for (var i = 0; i < arguments.length; i++){
        if(typeof arguments[i] === 'function'){
            cb = arguments[i];
        }
    }

    return function(name){
        if(models.hasOwnProperty(name)){
            fn.apply(this, arguments);
        }else{
            cb(new Error('This Schema doesn\'t exist'));
        }
    };
};

var repository = {
    getAll: repositoryAction(function(name, data, cb){
        var model = models[name];
        models[name].find({}, cb);
    }),
    get: repositoryAction(function(name, data, cb){
        models[name].findById(data, cb);
    }),
    create: repositoryAction(function(name, data, cb){
        models[name].create(data, cb);
    }),
    update: repositoryAction(function(name, data, cb){
        var id = data.id;
        delete data.id;
        models[name].findByIdAndUpdate(id, data, null, cb);
    }),
    delete: repositoryAction(function(name, data, cb){
        console.log('deleting shit');
        models[name].findById(data).remove(cb);
    })
};

module.exports = repository;
