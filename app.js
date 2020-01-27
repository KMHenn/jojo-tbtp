var express = require("express");
var path = require("path");
var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.redirect("/index");
});

app.get("/index", function(req, res){ res.render("index") });

app.use(function(request, response) {
    response.statusCode = 404;
    response.end("404!");
});
  
{/* <link rel="stylesheet" type="text/css" href="css/style.css" /> */}
app.listen(port);