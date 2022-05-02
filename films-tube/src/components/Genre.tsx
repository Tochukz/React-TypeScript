import IMovie from "../interfaces/IMovie";

import Movie from './Movie';

import '../scss/genre.scss';

export default function Genre(props: { movies: IMovie[], genre: string }) {
  return (
    <div className="row genre">
      <div className="col-sm-12">
        <h3>{ props.genre }</h3>
      </div>
      { props.movies.map(movie => <Movie movie={movie} key={movie.id}/>)}
    </div>
  )
}