import React, {useState} from 'react';
import axios from 'axios';
import {useParams, withRouter} from 'react-router-dom';

const UpdateForm = props => {
    const params = useParams();
    console.log('params in updateform',params)
    console.log('props in updateform',props);
    

    const [mov, setMov] = useState({title:'', director:'', metascore:'', stars:[]});

    console.log('mov in update form', mov)
    const handleChanges = e =>{
        setMov({...mov,id:params.id, [e.target.name]: e.target.value})
    }
    const handleStars = e =>{
        setMov({
            ...mov,
            stars: e.target.value.split(',')
        })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, mov)
       
          .then((res) => {
              console.log('res in put .then',res)
            props.setMovieList(props.movieList.map(movie => {
              if (movie.id === mov.id) {
                return res.data;
              } else {
                return movie;
              }
            }));
            props.history.push('/');
          })
          .catch((err) => console.log('error in axios put',err));
    }

    return(
        <div>
            <h1>Edit Movie</h1>
           
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
                    onChange={handleStars}
                    placeholder='Stars'
                />

                <button type='submit'>Update Movie</button>
            </form>
        </div>
    )
}

export default withRouter(UpdateForm);