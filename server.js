const app = require('./config/express')();
const port = app.get('port');
const request = require("request");
var filmsCache = [];

app.set("view engine", "ejs");

//--- ROUTES --//
app.get("/", function(req, res){
  res.render("search");
});

app.get("/results", function(req, res){
  
  var searchedMovie = req.query.searchValue;
  var films = [];

  //search films in cache
  for (i = 0; i < filmsCache.length; i++) {
    if (filmsCache[i].Title.toLowerCase().indexOf(searchedMovie.toLowerCase()) >= 0) {
        films.push(filmsCache[i]);
    }
  }

  if (films.length > 0){
    console.log("cache");
    res.render("results", {data: films});
  } else {
    //create a variable for the query string
    var queryString = "http://omdbapi.com/?s=" + searchedMovie + "&apikey=925eba28";
      
    request(queryString, function(error, response, body){
    if(!error && response.statusCode == 200){
        var parseData = JSON.parse(body);
        //add no cache
        for (i = 0; i < parseData.Search.length; i++) {
          filmsCache.push(parseData.Search[i]);
        }
        //add no banco

        res.render("results", {data: parseData.Search});
        }
    });
  }

  
  
});



// -- RUN -- //
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});