import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Base from '../layout/Base';
import IMovie from '../interfaces/IMovie';
import { getMovie } from '../store/movie.slice';
import emitter from '../services/event-emitter';

import '../scss/movie-details.scss';

function MovieDetails(props: {fetchMovie: Function}) {
  const params: any = useParams();
  const movieId = params.movieId;
  const defaultMovie: IMovie = {} as IMovie;
  const [movie, setMovie] = useState(defaultMovie);

  useEffect(() => {
    fetchMovie(movieId);
  }, [movieId]);

  const fetchMovie = (movieId: string) => {
    props.fetchMovie(movieId)
         .then((movie: IMovie) => {
           if (movie) {
             setMovie(movie);
           } 
         }).catch((error: any) => {
           emitter.emit('alert', {type: 'error', error});
         });
  }

  return (
    <Base>
      <div className='row movie-details'>
        <div className="col-sm-12">
          <h3>{ movie.title }</h3>
          <p>{ movie.slug}</p>
        </div>
        <div className="col-sm-6">          
           <div className='movie-div'>
             <img src={ movie.poster }  />
           </div>
        </div>
        <div className="col-sm-6">
          <table className='table table-bordered table-striped '>
            <tbody>
              <tr>
                <td>
                  <strong>Overview</strong>
                </td>
                <td>{ movie.overview}</td>
              </tr>
              <tr>
                <td>
                  <strong>Release Data</strong>
                </td>
                <td>{ new Date(movie.released_on).toDateString() }</td>
              </tr>
              <tr>
                <td>
                  <strong>Director</strong>
                </td>
                <td>{ movie.director }</td>
              </tr>
              <tr>
                <td>
                  <strong>Cast</strong>
                </td>
                <td>{
                   movie.cast && movie.cast.map((cast, i, arry) => 
                    <span key={i}>
                      { cast }
                      { i < arry.length -1 ? ', ' : ' '} 
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Clasification</strong>
                </td>
                <td>{ movie.classification}</td>
              </tr>
              <tr>
                <td>
                  <strong>Length</strong>
                </td>
                <td>{ movie.length }</td>
              </tr>
              <tr>
                <td>
                  <strong>Genre</strong>
                </td>
                <td>
                  { movie.genres && movie.genres.map((genre, i, arry) => 
                    <span key={i}>
                      { genre }
                      { i < arry.length -1 ? ', ' : ' '} 
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>IMDB Rating</strong>
                </td>
                <td>{ movie.imdb_rating}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  )
}

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = {
  fetchMovie: getMovie
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);