// Select Elements
var elDashboardList = document.querySelector(".dashboard__list");
var elDashboardForm = document.querySelector(".dashboard__form");
var elDashboardInputName = document.querySelector(".dashboard__input[name='name']");
var elDashboardInputOverview = document.querySelector(".dashboard__input[name='overview']");
var elDashboardInputGenres = document.querySelector(".dashboard__input[name='genres']");
var elDashboardInputPoster = document.querySelector(".dashboard__input[name='poster']");

// Normalizing Date
function normalizeData(setData) {
  var date = new Date(setData);

  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, 0);
  var day = String(date.getDate()).padStart(2, 0);

  return year + "-" + month + "-" + day;
}

// Rendering Movies
function renderMovies(moviesArray = [], moviesList) {
  moviesList.innerHTML = null;

  for (var i = 0; i < moviesArray.length; i++) {

    // Create elements
    var movie = document.createElement("li");
    var moviePoster = document.createElement("img");
    var movieInfo = document.createElement("div");
    var movieTitle = document.createElement("h3");
    var movieData = document.createElement("time");
    var movieOverview = document.createElement("p");
    var movieGenresList = document.createElement("ul");

    var releaseDate = new Date(moviesArray[i].release_date).getFullYear();

    // Set Attributes
    movie.setAttribute("class", "movie");
    moviePoster.setAttribute("class", "movie__poster");
    moviePoster.setAttribute("src", moviesArray[i].poster);
    moviePoster.setAttribute("alt", moviesArray[i].title + "'s poster");
    moviePoster.setAttribute("width", "280");
    moviePoster.setAttribute("height", "420");
    movieInfo.setAttribute("class", "movie__info");
    movieTitle.setAttribute("class", "movie__title");
    movieData.setAttribute("class", "movie__data");
    movieData.setAttribute("datatime", normalizeData(moviesArray[i].release_date));
    movieData.setAttribute("title", normalizeData(moviesArray[i].release_date));
    movieOverview.setAttribute("class", "movie__overview");
    movieGenresList.setAttribute("class", "movie__genres");

    // Set Text
    movieTitle.textContent = moviesArray[i].title;
    movieData.textContent = "(" + releaseDate + ")";
    movieOverview.textContent = moviesArray[i].overview;

    // Set Text for Genres
    for (var j = 0; j < moviesArray[i].genres.length; j++) {
      var movieGenresItem = document.createElement("li");
      movieGenresItem.textContent = moviesArray[i].genres[j];
      movieGenresItem.setAttribute("class", "genre");
      movieGenresList.appendChild(movieGenresItem);
    }

    // Appending
    movie.appendChild(moviePoster);
    movie.appendChild(movieInfo);
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieData);
    movie.appendChild(movieOverview);
    movie.appendChild(movieGenresList);
    moviesList.appendChild(movie);
  }
}

// Add New Movie 
function addNewMovie(name, overview, genres, poster, moviesArray) {
  var newMovieName = name.value.trim();
  var newMovieOverview = overview.value.trim();
  var newMovieGenres = genres.value.trim().split(" ");
  var newMoviePoster = poster.value.trim();

  var newMovie = {
    title: newMovieName,
    poster: newMoviePoster,
    overview: newMovieOverview,
    genres: newMovieGenres,
  };

  moviesArray.unshift(newMovie);
}

var renderNewMovie = function (evt) {
  evt.preventDefault();

  addNewMovie(
    elDashboardInputName,
    elDashboardInputOverview,
    elDashboardInputGenres,
    elDashboardInputPoster,
    films
  );

  renderMovies(films, elDashboardList);
};

renderMovies(films, elDashboardList);

elDashboardForm.addEventListener("submit", renderNewMovie);
