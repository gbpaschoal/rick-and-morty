import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { Home } from "./components/Home";
import { Favorites } from "./components/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);
