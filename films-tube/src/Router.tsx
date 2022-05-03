import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:movieId" element={<MovieDetails />} />
      <Route path="/search-results/:query" element={<SearchResults />} />
    </Routes>   
  );
}