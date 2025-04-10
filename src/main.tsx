import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FavoriteProvider from './components/FavoriteProvider';

import App from './App';
import Favorites from './components/Favorites';
import Characters from './components/Characters';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Characters/>
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
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
