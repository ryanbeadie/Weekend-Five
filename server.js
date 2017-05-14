var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var path = require ('path');
var mongoose = require ('mongoose');

//connect to mongoDB
mongoose.connect( 'mongodb://localhost:27017/Movies');

var movieSchema = mongoose.Schema ({
  title: String,
  poster: String,
  date: Number
});

// model
var favoriteMovies = mongoose.model('favoriteMovies', movieSchema );

//uses
app.use(express.static('public'));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded( {extended: true }) );

//port
var port = process.env.PORT || 5000;



//spin up server
app.listen(port, function(){
  console.log('server up on:', port);
});//end server

app.get('/', function(req, res){
  res.sendFile(path.resolve('public/views/index.html') );
});

app.post('/addFavMovie', function(req, res){
  console.log('in POST route' , req.body);
  var dbMovie = favoriteMovies(req.body);
  dbMovie.save().then(function(){
  res.sendStatus(200);
});// end save to db
});// end post


//get favs from db
app.get('/getFavs', function(req, res){
    console.log('in GET favs rout');
    favoriteMovies.find().then(function (data){
    console.log('data from db' , data);
    res.send(data);
    });
});// end get
