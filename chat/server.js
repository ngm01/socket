var express = require('express');
var path = require('path');
var session = require('express-session');

var app = express();
app.use(express.static(path.join(__dirname + "/static")));
app.set('view engine', 'ejs');

//Need to set up routes as a seperate folder
var router = require('./config/routes.js');
router(app);

var server = app.listen(8000, function(){
    var line = "\n**************************\n"
    console.log(line, "Socket Chat", "\n" , "Listening on Port 8000", line);
})
var io = require('socket.io').listen(server);
var users = [];
var posts = [];
io.sockets.on('connect', function(socket){
    io.emit("users", users);
    io.emit("posts", posts);
    socket.on("new_user", (user_info)=>{
        users.push(user_info);
        io.emit("users", users);
        socket.emit("posts", posts);
        //need to incorporate session into this?
    })
    socket.on("new_msg", (msg_info)=>{
        posts.push(msg_info);
        io.emit("posts", posts);
    })
    
})

// unnecesary
// function populatePostsUsers(){
//     for(let i=0;i<posts.length;i++){
//         for(let k=0;k<users.length;k++){
//             if(posts[i].user_id == users[k].user_id){
//                 posts[i].user_name = user[k].user;
//             }
//         }
//     }
//     return posts;
// }