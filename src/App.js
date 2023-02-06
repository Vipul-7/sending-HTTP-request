import React, { useState } from "react";

import MoviesList from "./component/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seError] = useState(null);

  const fetchMoviesHanlder = () => {
    setIsLoading(true);
    seError(null); // reseting the previous errors

    fetch("https://swapi.dev/api/film")
      .then((response) => response.json())
      .then((data) => {
        const trandformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            release: movieData.release_date,
          };
        });

        setMovies(trandformedMovies);
        setIsLoading(false);
      })
      .catch((err) => {
        seError(err.message);
        setIsLoading(false);
      });
  };

  // Promises can be written in another way async and await
  // const fetchMoviesHanlder = async () => {
  //   setIsLoading(true);
  //   seError(null); // reseting the previous error

  //   try {
  //     const response = await fetch("https://swapi.dev/api/films");

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await response.json();
  //     const trandformedMovies = await data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         release: movieData.release_date,
  //       };
  //     });

  //     setMovies(trandformedMovies);
  //     setIsLoading(false);
  //   } catch (err) {
  //     seError(err.message);
  //     setIsLoading(false);
  //   }
  // };

  
  let content = <p>Found no movies!</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content= <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHanlder}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies!</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
