import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App';
import { lazy } from 'react';
const Characters = lazy(() => import('@/components/Characters/Characters'));
const Favorites = lazy(() => import('@/components/Favortites/Favorites'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Characters />} />
      <Route path="/favorites" element={<Favorites />} />
    </Route>
  )
);
