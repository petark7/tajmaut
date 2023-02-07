import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App';
import ErrorPage from "./routes/error-page";
import Schedule from './routes/schedule';
import Venues from './routes/venues';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    errorElement: <ErrorPage/>,
  },

  {
    path: "/home",
    element: <App />,
    errorElement: <ErrorPage/>,
  },

  {
    path: "/schedule",
    element: <Schedule />,
    errorElement: <ErrorPage/>,
  },

  {
    path: "/venues",
    element: <Venues />,
    errorElement: <ErrorPage/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <div className="app">
       <RouterProvider router={router} />
      </div>

  </React.StrictMode>
);
