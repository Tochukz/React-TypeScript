import { useRef, useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import IMovie from '../interfaces/IMovie';
import { searchMovie } from '../store/movie.slice';
import emitter from '../services/event-emitter';

import '../scss/topbar.scss';

 function TopBar(props: {search: Function, searchResult: IMovie[]}) {
  const inputRef: any = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.onchange = pickSelected;
  }, []);

  const suggest = (event: any) => {
    const val = event.target.value;
    if (val.length < 2) {
        return;
    }
    props.search(val)
          .then()
          .catch((error: any) => {
            emitter.emit('alert', {type: 'error', error});
          });
  }

  const pickSelected = (event: any) => {
    const val = event.target.value;
    if(!Array.isArray(props.searchResult)) {
        return;
    }
    let movie = props.searchResult.find(mv => mv.title == val);
    if (movie) {
        navigate(`/details/${movie.id}`);
    } else {
        navigate(`/search-results/${val}`);
    }
  }

  return (
    <div className="row topbar">
       <div className="col-sm-6">
           <h1>
             <Link to="/">
               WOOKIE<br /> 
               MOVIES
             </Link>
           </h1>           
       </div>
       <div className="col-sm-3 offset-sm-3">
          <div className="form-group mt-4">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="fa fa-search"></i>   
                </span>
                </div>
                <input className="form-control search-input" 
                       type="search"  
                       list="resultList" 
                       placeholder="Search Movie" 
                       autoComplete="off"
                       onKeyUp={suggest} 
                       ref={inputRef} /> 
                <datalist id="resultList">
                  { Array.isArray(props.searchResult) && props.searchResult.map((movie, index) => <option value={movie.title} key={index} />) }   
                </datalist>            
            
            </div>
          </div>
       </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  searchResult: state.movie.searchResult
});

const mapDispatchToProps = {
 search: searchMovie,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);