import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Base from '../layout/Base';
import IMovie from '../interfaces/IMovie';
import { getMovie } from '../store/movie.slice';

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
            setMovie(movie);
         }).catch((err: any) => {

         });
  }
  return (
    <Base>
      <div className='row movie-details'>
        <div className="col-sm-12">
          <h3>{movie && movie.title }</h3>
          <p>{movie && movie.slug}</p>
        </div>
        <div className="col-sm-6">          
           <div className='movie-div'>
             <img src={movie && movie.poster}  />
           </div>
        </div>
        <div className="col-sm-6">
          <table className='table table-bordered table-striped '>
            <tbody>
              <tr>
                <td>
                  <strong>Overview</strong>
                </td>
                <td>{ movie && movie.overview}</td>
              </tr>
              <tr>
                <td>
                  <strong>Release Data</strong>
                </td>
                <td>{ movie && new Date(movie.released_on).toDateString()}</td>
              </tr>
              <tr>
                <td>
                  <strong>Director</strong>
                </td>
                <td>{ movie && movie.director}</td>
              </tr>
              <tr>
                <td>
                  <strong>Cast</strong>
                </td>
                <td>{ movie && movie.cast && movie.cast.map((cast, i) => <span key={i}>{ cast }</span>)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Clasification</strong>
                </td>
                <td>{ movie && movie.classification}</td>
              </tr>
              <tr>
                <td>
                  <strong>Length</strong>
                </td>
                <td>{ movie && movie.length}</td>
              </tr>
              <tr>
                <td>
                  <strong>Genre</strong>
                </td>
                <td>{ movie && movie.genres && movie.genres.map((genre, i) => <span key={i}>{  genre}</span>)}</td>
              </tr>
              <tr>
                <td>
                  <strong>IMDB Rating</strong>
                </td>
                <td>{ movie && movie.imdb_rating}</td>
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