import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import Characters from './components/Characters';
import Favorites from './components/Favorites';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Characters />} />
      <Route path="/favorites" element={<Favorites />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
