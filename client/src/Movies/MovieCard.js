import React from 'react';
import axios from 'axios';
import MovieList from './MovieList';

const MovieCard = props => {
  console.log('props in moviecard',props)
  const { title, director, metascore, stars } = props.movie;

  const updateMovie = e =>{
    props.history.push(`/update-movie/${props.movie.id}`)
  }

  const deleteMovie = e =>{
    console.log(e)
    axios
    .delete(`http://localhost:5000/api/movies/${props.match.params.id}`)
    .then(res=>{
      console.log('res in axios delete .then', res)
      console.log(props.movieList)
      props.setMovieList(props.movieList.filter(delMovie=> delMovie.id !== props.movie.id))
      props.history.push('/')
      })
      
    
    .catch(err=>{
      console.log('err in delete axios request: ',err)
    })
  }

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={updateMovie}>Update Movie</button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
};

export default MovieCard;
