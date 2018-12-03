var express = require('express');
var app = express();
var todoController = require('./controllers/controller');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

todoController(app); 

app.listen(8080);
   