import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const UpdateForm = props => {
    const params = useParams();
    console.log('params in updateform',params)
    console.log('props in updateform',props);

    const [mov, setMov] = useState({title:'', director:'', metascore:'', stars:[]});


    const handleChanges = e =>{
        if(e.target.name === 'stars'){
            e.target.value = e.target.value.split(',')
        }
        setMov({...mov, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e =>{
        e.preventDefault();
        axios.put(`http://localhost:3000/api/movies/${mov.id}`, mov)
          .then((res) => {
            props.setMovieList(props.movieList.map(movie => {
              if (movie.id === mov.id) {
                return res.data;
              } else {
                return movie;
              }
            }));
            props.history.push('/');
          })
          .catch((err) => console.log(err.response));
    }

    return(
        <div>
            <p>update movie form</p>
            <form onSubmit={handleSubmit}> 
                <input
                    type='text'
                    name='title'
                    value={mov.title}
                    onChange={handleChanges}
                    placeholder='Title'
                />
                 <input
                    type='text'
                    name='director'
                    value={mov.director}
                    onChange={handleChanges}
                    placeholder='Director'
                />
                 <input
                    type='text'
                    name='metascore'
                    value={mov.metascore}
                    onChange={handleChanges}
                    placeholder='Metascore'
                />
                 <input
                    type='text'
                    name='stars'
                    value={mov.stars}
                    onChange={handleChanges}
                    placeholder='Stars'
                />

                <button type='submit'>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateForm;