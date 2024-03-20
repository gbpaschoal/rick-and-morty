import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App';
import { lazy } from 'react';

const Characters = lazy(() => import('@/pages/characters/characters'));
const Favorites = lazy(() => import('@/pages/Favorites'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/characters" element={<Characters />} />
      s
      <Route path="/favorites" element={<Favorites />} />
    </Route>
  )
);
