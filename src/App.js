import React, { useState, useEffect, useCallback } from "react";
import AddMovie from "./component/AddMovie";

import MoviesList from "./component/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Promises written in then approach

  // const fetchMoviesHanlder = useCallback(() => {
  //   setIsLoading(true);
  //   seError(null); // reseting the previous errors

  //   fetch(
  //     "https://learning-http-req-in-react-default-rtdb.firebaseio.com/movies.json"
  //   ) // firebase link
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
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       seError(err.message);
  //       setIsLoading(false);
  //     });
  // }, []);

  // Promises can be written in another way async and await
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://learning-http-req-in-react-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          release: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    // async in promise
    const response = await fetch(
      "https://learning-http-req-in-react-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie), // convert to json format
        headers: {
          // not required for firebase backend
          "content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  let content = <p>Found no movies!</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
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
