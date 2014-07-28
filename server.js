var express = require('express'),
    mongoose = require('mongoose');

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/enbudget');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function() {
  console.log('enbudget db opened');
});

var hwSchema = mongoose.Schema({
  message: String
});
var hwModel = mongoose.model('message', hwSchema);

var mongoMessage;
hwModel.find({}).exec(function(err, collection) {
  mongoMessage = collection[0].message;
});

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.render('index', {
    dbMessage: mongoMessage
  });
});

var port = 8008;
app.listen(port);
console.log('app listening on port ' + port);
