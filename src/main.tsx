import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoriteProvider } from './components/Favorites';
import { SearchModalProvider } from './components/Search';

import App from './App';
import Favorites from './components/Favorites';
import Hero from './components/Hero';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Hero/>
      },
      {
        path: 'fav',
        element: <Favorites/>
      }
    ]
  },

]
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchModalProvider>
        <FavoriteProvider>
          <RouterProvider router={router} />
        </FavoriteProvider>
      </SearchModalProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
