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
// import FavoritesLayout from './components/FavoritesLayout.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    // children: [
    //   {
    //     path: 'fav',
    //     element: <FavoritesLayout/>
    //   }
    // ]
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
