var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("index");
})

var server = app.listen(8000, function(){
    var line = "\n**************************\n"
    console.log(line, "Survey Form Revisted", "\n" , "Listening on Port 8000", line);
})
var io = require('socket.io').listen(server);
var results;
io.sockets.on('connection', function(socket){
    //server socket code goes here...
    socket.emit('updated_message', results);
    socket.on('posting_form', function(data){
        results = data;
        results.number = Math.floor(Math.random() * 1001);
        
    })
})