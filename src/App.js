import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  // using callback to wrap our fetchMovieHandler to avoid infinite loop of callback in the useEffect
  const fetchMovieHandler = useCallback(async () =>{
    setIsLoading(true)
    try{
    // fetch('https://swapi.dev/api/films/').then(response =>{
    //   return response.json();
    // }).then(data => {
    //   const transformedMovies = data.results.map(movieData => {
    //     return {
    //       id: movieData.episode_id,
    //       title: movieData.title,
    //       openingText : movieData.opening_crawl,
    //       releaseDate : movieData.release_date
    //     }
    //   })
    //   setMovies(transformedMovies);
    // })
    // using Promise
    const response = await fetch('https://swapi.dev/api/films/');
    if (!response.ok){
      throw new Error('Something went wrong')
    }
    const data = await response.json();
    
    const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText : movieData.opening_crawl,
            releaseDate : movieData.release_date
          }
        })
    setMovies(transformedMovies);
    } catch(err){
      setError(err.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMovieHandler()
  }, [fetchMovieHandler])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length !== 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies!</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading ...</p>}
        
      </section>
    </React.Fragment>
  );
}

export default App;
