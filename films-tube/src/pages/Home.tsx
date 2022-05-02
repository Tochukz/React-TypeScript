import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import IMovie from '../interfaces/IMovie';
import Base from '../layout/Base';
import Genre from '../components/Genre';
import { getMovies } from '../store/movie.slice';

function Home(props: { movies: IMovie[], fetchMovies: Function }) {
  const [names, setNames] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
     fetchMovies();
  }, []);

  const fetchMovies = () => {
     props.fetchMovies()
          .then((response: any) => {                 
          if (response.status == 200) {     
              console.log('mov', response.data);              
            sortMovies(response.data.movies);
          }
          }).catch((err: any) => {
            console.error('Fetch error:',  err);
         });
  }

  const sortMovies = (movies: IMovie[]) => {
     const groups: any = {}; 
     console.log(movies.length);

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