var session = require('express-session');

module.exports = function (app) {
    
    //what is requiring my .ejs files to be in './views'?
	app.get("/", function(req, res){
			res.render('index');
    })
}