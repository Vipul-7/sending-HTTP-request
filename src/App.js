import React, { useState } from "react";

import MoviesList from "./component/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  // const fetchMoviesHanlder = () => {
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const trandformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           release: movieData.release_date,
  //         };
  //       });

  //       setMovies(trandformedMovies);
  //     });
  // };

  // Promises can be written in another way async and await
  const fetchMoviesHanlder = async () => {
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const trandformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        release: movieData.release_date,
      };
    });

    setMovies(trandformedMovies);
  };



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHanlder}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
