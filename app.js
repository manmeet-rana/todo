var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();

//for adding css file
app.use(express.static('./public'));

//setting template engine
app.set('view engine', 'ejs');

//controller fire
todoController(app);

app.listen(3000);
console.log('listening to port 3000');
