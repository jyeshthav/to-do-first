// var data = [{item: 'angular'}, {item: 'node'}, {item: 'react'}];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require('mongoose');
mongoose.connect('mongodb://jyeshthav:testlist1@dbh54.mlab.com:27547/to-do-list');
var todoSchema = new mongoose.Schema({
    item: String
});
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'angular'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved!');
// });

module.exports = function(app){
    app.get('/', function(req, res){
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {tasks: data});
        });
    });
    app.post('/', urlencodedParser, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
                if (err) throw err;
                res.json({tasks: data});
            });
    });
    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json({tasks: data});
        });
    });
};