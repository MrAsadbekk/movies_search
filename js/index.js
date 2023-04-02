const imageUrl = "https://image.tmdb.org/t/p/w500";
let url =
  "https://api.themoviedb.org/3/discover/movie?api_key=3e2aed1f077fcc9b58ac1f7add9113d3";

const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=3e2aed1f077fcc9b58ac1f7add9113d3&query=";

const box = document.querySelector(".box__container");
const loaderContainer = document.querySelector(".loader__container");
const loading = document.createElement("div");
loading.classList.add("loader");
const loadingText = document.createElement("p");
loadingText.textContent = `Loading...`;

loaderContainer.appendChild(loading);
loaderContainer.appendChild(loadingText);

const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search__btn");

async function fetchData() {
  const searchTerm = search.value;

  if (searchTerm) {
    url = `${searchUrl}${searchTerm}`;
  } else {
    url =
      "https://api.themoviedb.org/3/discover/movie?api_key=3e2aed1f077fcc9b58ac1f7add9113d3";
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);

    box.innerHTML = "";

    data.results.map((movie) => {
      console.log(movie);

      const movieBox = document.createElement("div");
      movieBox.classList.add("box");

      const moviePoster = document.createElement("img");
      moviePoster.classList.add("box__poster");
      moviePoster.src = `${imageUrl}${movie.backdrop_path}`;
      moviePoster.alt = movie.title;

      const movieTitle = document.createElement("h3");
      movieTitle.classList.add("box__title");
      movieTitle.textContent = movie.title;

      const movieMiniBox = document.createElement("div");
      movieMiniBox.classList.add("box__two");

      const movieLanguage = document.createElement("p");
      movieLanguage.classList.add("box__language");
      movieLanguage.textContent = `Language: ${movie.original_language}`;

      const movieRating = document.createElement("p");
      movieRating.classList.add("box__rating");
      movieRating.textContent = `Rating: ${movie.vote_average}`;

      movieMiniBox.appendChild(movieLanguage);
      movieMiniBox.appendChild(movieRating);

      movieBox.appendChild(moviePoster);
      movieBox.appendChild(movieTitle);
      movieBox.appendChild(movieMiniBox);
      box.appendChild(movieBox);
    });
  } catch (error) {
    console.log(error);
  }
}

setTimeout(() => {
  fetchData();
}, 400000);

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  fetchData();
});
