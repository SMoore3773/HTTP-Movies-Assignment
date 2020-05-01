import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./UpdateForm";
import AddMovie from './AddMovie';
import axios from 'axios';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <NavLink to='/add-movie'>Add Movie</NavLink>
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id" render={props =>{
        return<Movie {...props} addToSavedList={addToSavedList} />
      }}/>
      <Route path='/add-movie'> 
      <AddMovie movieList={movieList} setMovieList={setMovieList} />
      </Route>
      <Route path="/update-movie/:id">
        <UpdateForm movieList={movieList} setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
