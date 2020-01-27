var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var locationLog = [];
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", function(req, res){res.redirect("/index");});

app.get("/index", function(req, res){res.render("index.ejs")});

app.get("/getMarkers", function(req, res){
    if (locationLog.length === 0){
        // Initialize
        var campusMark = new Marker("Campus", 36.864700, -76.043120)
        locationLog.push(campusMark);
    }

    res.set('Content-Type', 'application/json');
    res.send({"locationLog" : locationLog});
});

app.post("/addMarker", function(req, res){
    let lat = req.body.lat;
    let lng = req.body.lng;
    let label = req.body.label;
    let mark = new Marker(label, lat, lng);
    locationLog.push(mark);
    // add loc to array
    res.redirect("/index");
})

app.get("/getMarkers", function(req, res){

})

app.use(function(request, response) {
    response.statusCode = 404;
    response.end("404!");
});
  
app.listen(port);


// Marker
class Marker{
    constructor(label, lat, lng){
        this.label = label;
        this.lat = lat;
        this.lng = lng;
    }
}