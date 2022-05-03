import { connect } from "react-redux";
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { searchMovie } from '../store/movie.slice';
import IMovie from "../interfaces/IMovie";
import Base from '../layout/Base';
import emitter from '../services/event-emitter';

import '../scss/search-result.scss';

function SearchResults(props: { searchMovie: Function, searchResult: IMovie[]}) {
  const param = useParams();
  const searchParam = (param.query as string);
  const navigate = useNavigate();

  useEffect(() => {
    searchMovie(searchParam)
  }, [ searchParam ]);

  const searchMovie = (searchParam: string) => {
    props.searchMovie(searchParam)
         .then()
         .catch((error: any) => {
           emitter.emit('alert', {type: 'error', error});
         });
  }

  return (
    <Base>
      <div className="row search-result">
         <div className="col-sm-12">
            <h3>Search results for <em>{ searchParam }</em></h3>
         </div>
         { props.searchResult && props.searchResult.map((movie, i) => 
            <div className="row" key={i}> 
              <div className="col-sm-4">
                <div className="img-div center">
                  <Link to={`/details/${movie.id}`}>
                    <img src={movie.poster}  />
                   </Link>
                </div>
              </div>
              <div className="col-sm-6">
                <h3>{ movie.title }</h3>
                <p>{ movie.slug }</p>
                <p>{ new Date(movie.released_on).toDateString() }</p>
                <p>{ movie.director }</p>
                <p>{ movie.overview }</p>
                <p>
                  { movie.genres.map((genre, i, arry) => 
                    <span key={i}>
                        { genre } 
                        { i < arry.length -1 ? ', ' : ' '} 
                    </span> 
                  )}
                </p>
                <p>
                  { movie.cast.map((cast, i, arry) => 
                    <span key={i}>
                      { cast } 
                      { i < arry.length -1 ? ', ' : ' '} 
                    </span>
                  )}
                </p>
                <p>{ movie.length }</p>
                <p>{ movie.classification }</p>
              </div>
            </div>    
         )}
         {props.searchResult.length == 0 && <p>No result found for search query: {searchParam}</p>}
      </div>
    </Base>
 )
}

const mapStateToProp = (state: any) => ({
  searchResult: state.movie.searchResult,
});

const mapDispatchToProp = {
  searchMovie,
}

export default connect(mapStateToProp, mapDispatchToProp)(SearchResults);
