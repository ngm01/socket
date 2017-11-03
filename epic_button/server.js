var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('view engine', 'ejs');
app.get('/', function(req, res){res.render("index")});

var server = app.listen(8000, function(){
    var line = "\n**************************\n"
    console.log(line, "Epic Button Game", "\n" , "Listening on Port 8000", line);
})
var io = require('socket.io').listen(server);
var times = 0;
io.sockets.on('connect', function(socket){
    io.emit('times', times);
    socket.on('epic_button', ()=>{
        times++;
        console.log("Button pushed. Times:", times)
        io.emit('times', times);
    })
    socket.on("reset_button", ()=>{
        times = 0;
        console.log("Times reset:", times)
        io.emit('times', times);
    })
})