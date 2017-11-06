var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds249575.mlab.com:49575/todo');
//creating schema its like a blueprint for the data
var todoSchema = new mongoose.Schema({
  item: String
});

var Todos = mongoose.model('Todos',todoSchema);

var itemOne = Todos({item: 'buy the flowers'}).save(function(err){
  if(err)  throw err;
  console.log('item saved');
});
var data = [{item:'get milk'} , {item:'walk the dog'} , {item : 'do some coding'}];
module.exports = function (app) {

var urlencodedParser = bodyParser.urlencoded({extended : false});

app.get('/todo',function(req,res){
res.render('todo',{todos : data});
});

app.post('/todo',urlencodedParser,function(req,res){
data.push(req.body);
res.json(data);
});

app.delete('/todo/:item',function(req,res){
  data = data.filter(function(todo) {
  return todo.item.replace(/ /g,'-')!== req.params.item;
});
res.json(data);
});

}
