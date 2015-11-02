var express = require('express');
var bodyParser = require('body-parser');
var hyperbot = require('./hyperbot');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

//test
app.get('/',function (req, res) {res.status(200).send("yo")});

app.post('/hello', hyperbot);

//error handler
app.use(function (err,req,res,next){
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
