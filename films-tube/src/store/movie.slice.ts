import { createSlice } from '@reduxjs/toolkit';

import { composeInitial, putInStore, getFromStore }  from '../helpers/storage';
import IMovie from '../interfaces/IMovie';
import service from '../services';

const slice = createSlice({
  name: 'movie',
  initialState: composeInitial('movie'),
  reducers: {
    setMovies(state: any, action) {
        state.movies = action.payload;
        putInStore('movie', 'movies', state.movies);
    },
    setSearchResult(state: any, action) {
        state.searchResult = action.payload;
        putInStore('movie', 'searchResult', state.searchResult);
    }
  }
});

const { setMovies, setSearchResult } = slice.actions;

export const getMovies = () => async (dispatch: Function) => {
    const response = await service.get('/movies');
    if(response.status == 200) {           
       dispatch(setMovies(response.data && response.data.movies));
    }
    return response;
}
  
export const getMovie = (movieId: string) => async () => {
  const movies: IMovie[] =  getFromStore('movie', 'movies') || [];
  const movie = movies.find(mv => mv.id == movieId);
  return movie;
}

export const searchMovie = (query: string) => async (dispatch: Function) => {
  const response = await service.get(`movies?q=${query}`);
  if (response.status == 200) {
    dispatch(setSearchResult(response.data && response.data.movies));
  }
  return response;
}

export const movieSlice = slice.reducer;
