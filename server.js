var express = require('express'),
app = express(),
http = require('http'),
bodyParser = require("body-parser"),
favicon = require("serve-favicon");

app.set('port', process.env.PORT || 8080);
app.use(favicon(__dirname + "/app/resources/andserve-icon.png"));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// include basic content
app.use(express.static(__dirname));

// routing
app.get('/', function(req, res) {
    res.sendFile('app/views/index.html', {root: __dirname});
});

app.get('*', function(req, res){
  res.sendFile('app/views/404.html', {root: __dirname});
});

/*var server = app.listen(process.env.PORT || 3000);*/
http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
