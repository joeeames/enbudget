var express = require('express');

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.render('index');
});

var port = 8008;
app.listen(port);
console.log('app listening on port ' + port);
