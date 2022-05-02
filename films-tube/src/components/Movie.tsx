import IMovie from "../interfaces/IMovie";
import { useNavigate} from 'react-router-dom';

import '../scss/movie.scss';

export default function Movie(props: {movie: IMovie}) {
  
  const navigate = useNavigate();

  const gotoDetails = (movieId: string) => {
    navigate(`/details/${movieId}`);
  };

  return (
    <div className="col-sm-3 movie">
      <div className="item pt-2 pb-2" onClick={() => gotoDetails(props.movie.id)}>
        <p className="movie-p">
          <img src={props.movie.poster} />
        </p>
        <p className="center">
          <strong>{props.movie.title}</strong>
        </p>
        <p className="center">
          {props.movie.slug}
        </p>
      </div>      
    </div>
  );
} 