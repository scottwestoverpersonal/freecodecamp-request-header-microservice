var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     var info = {
         'IP Address': ip,
         'Language': req.headers["accept-language"].split(',')[0],
         'Software': req.headers['user-agent'].split(') ')[0].split(' (')[1]
     };
     res.send(info);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


