import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import IMovie from '../interfaces/IMovie';
import Base from '../layout/Base';
import Genre from '../components/Genre';
import { getMovies } from '../store/movie.slice';
import emitter from '../services/event-emitter';

function Home(props: { movies: IMovie[], fetchMovies: Function }) {
  const [names, setNames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
     fetchMovies();
  }, []);

  const fetchMovies = () => {
    setIsLoading(true);
     props.fetchMovies()
          .then((response: any) => {                 
          if (response.status == 200) {              
            sortMovies(response.data.movies);
            setIsLoading(false);
          }
          }).catch((error: any) => {
            emitter.emit('alert', {type: 'error', error})
         });
  }

  const sortMovies = (movies: IMovie[]) => {
     const groups: any = {}; 
     movies.forEach((movie, i) => {         
         movie.genres.forEach(genre => {
            if(!groups.hasOwnProperty(genre)) {
              groups[genre] = [];
            }
            groups[genre] = [...groups[genre], movie];        
        });         
     });    
     setGenres(Object.values(groups));
     setNames(Object.keys(groups) as any);
     
  }

  return (
    <Base>
      { isLoading? <h3 className='text-center'>Loading...</h3> : ''}
      { genres.map((movies, i) => <Genre movies={movies} key={i} genre={names[i]} />)}
    </Base>
  )
}

const mapStateToProps = (state: any) => ({
  movies: state.movie.movies
});

const mapDispatchToProps = {
  fetchMovies: getMovies
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);