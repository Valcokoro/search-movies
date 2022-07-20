import React, {useState, useEffect} from 'react';
import '../styles/SearchPage.css';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import movie from '../apis/movie';
import cinema from '../assets/cinema.jpg';



const SearchPage = () => {

    
    const [term, setTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState()


    const CircularIndeterminate = () => {
      return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      );
    }

    const onSubmit = event => {

        event.preventDefault();
    
        search(term);

        setTerm('');
    
      };

    useEffect(() => {
       
       search(term)

    }, []);


    const KEY = '59e3e159';
    const  search = async term => {
        const response = await movie.get('', {
            params: {
                s: term,
                apikey: KEY
            }
        });
        if(response.data === null){
           setLoading(CircularIndeterminate)
        }
        setMovies(response.data)
        console.log(response.data)
    
    }

    return (
        <section className='search-page'>
         <div className='header'>
           <button className='btn'>MyTestApp</button>
         </div>
          <div className='first-section'>
            <img src={cinema} alt='cinema' className='cinema' />
            <p className='incredible'>Watch Something Incredible</p>
          </div>
          <form onSubmit={onSubmit}>
            <h3>Search</h3>
            <input 
               type='text' 
               value={term}
               onChange={(event)=> setTerm(event.target.value)}
               className='search-bar'
               />
          </form>
           <div>
               {movies?.Search?.map((movie) => {
                   return <div className='flex-container'>
                        <div className='flex-item'>
                       <img src={movie.Poster} alt='movie' className='movie-pics'/>
                       <p className='movie-title'>{movie.Title}</p> 
                       </div>
                       </div>
               })}
           </div>
           <div>{loading}</div>
         
         

        </section>
    )
}


export default SearchPage;