import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:movieId" element={<MovieDetails />} />
    </Routes>   
  );
}