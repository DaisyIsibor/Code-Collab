import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";  

// export default function Home() {
//     return (<div>Home</div>)
// }

import App from './App';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Mentors from './pages/Mentors';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Define the accessible routes and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        index: true, // saying that the base page is going to go to the 'Home' page 
        element: <Home />,
      },
      {
        path: '/Apply',
        element: <Apply />,
      },
      {
        path: '/Profile',
        element: <Profile />,
      },
      {
        path: '/Mentors',
        element: <Mentors />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Signup',
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
