import React, {useState, useEffect} from 'react';
import '../styles/SearchPage.css';
import movie from '../apis/movie';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material';
import cinema from '../assets/cinema.jpg';


const SearchPage = () => {

    const [term, setTerm] = useState('Hello');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)



    const onSubmit = event => {

        event.preventDefault();
    
        search(term);
        setLoading(false);

        setTerm('');
    
      };

    useEffect(() => {
       search(term);
    }, [])


    const KEY = '59e3e159';
    const  search = async term => {
        const response = await movie.get('', {
            params: {
                s: term,
                apikey: KEY
            }
        });
        setMovies(response.data);
        setLoading(true);
        console.log(response.data);
    }




    const renderedList = movies?.Search?.map((movie, index) => {
      return (
        <div className='flex-item' key={index}>
          <img src={movie.Poster} alt='movie' className='movie-pics'/>
            <div className='content'>
              <div className='meta'>{movie.Title}</div>
            </div>
        </div>
      );
    })

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
            <h3 className='search'>Search</h3>
            <input 
               type='text' 
               value={term}
               onChange={(event)=> setTerm(event.target.value)}
               className='search-bar'
               />
          </form>
           <div className='flex-container'>
              {loading ? (renderedList) : (<Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
              >
             <CircularProgress color="inherit" />
             </Backdrop>)} 
          </div>
           
         
         

        </section>
    )
}


export default SearchPage;