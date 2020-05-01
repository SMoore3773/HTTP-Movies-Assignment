import React,{useState} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';

const AddMovie = props =>{
    const params = useParams();
    const history = useHistory();
    console.log('history in addmovie',history)
    console.log('props in addMovie',props)
    const [mov, setMov] = useState({title:'', director:'', metascore:'', stars:[]});
    const handleChanges = e =>{
        setMov({...mov,id:Date.now(), [e.target.name]: e.target.value})
    }
    const handleStars = e =>{
        setMov({
            ...mov,
            stars: e.target.value.split(',')
        })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies/`, mov)
       
          .then((res) => {
              console.log('res in put .then',res)
            history.push('/');
          })
          .catch((err) => console.log('error in axios put',err));
    }

    return(
        <div>
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

                <button type='submit'>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;
