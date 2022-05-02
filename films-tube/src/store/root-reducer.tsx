import { combineReducers } from "@reduxjs/toolkit";

import { movieSlice } from './movie.slice';

export const rootReducer = combineReducers({
  movie: movieSlice,
});