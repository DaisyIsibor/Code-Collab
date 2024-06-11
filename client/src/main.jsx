// <<<<<<< sheryl/code-work2
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ReactDOM from "react-dom/client";
// import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";  

// export default function Home() {
//     return (<div>Home</div>)
// }

// import App from './App';
// import Home from './pages/Home';
// =======
// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import ProtectedRoute from './components/ProtectedRoute';
// import RegisterForm from './components/RegisterForm';
// import Login from './pages/Login';
// import UserDetail from './pages/UserDetail';
// import UserList from './pages/UserList';
// >>>>>>> main
// import Apply from './pages/Apply';
// import Home from './pages/Home';
// import Mentors from './pages/Mentors';
// import Profile from './pages/Profile';
// import Signup from './pages/Signup';
// import Auth from './utils/auth';
// import './index.css'; // Global CSS import

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/RegisterForm';
import Login from './pages/Login';
import UserDetail from './pages/UserDetail';
import UserList from './pages/UserList';
import Apply from './pages/Apply';
import Home from './pages/Home';
import Mentors from './pages/Mentors';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Auth from './utils/auth';
import './index.css'; // Global CSS import
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, []);

  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/users/:userId" element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />
        <Route path="/apply" element={<ProtectedRoute><Apply /></ProtectedRoute>} />
        <Route path="/mentor" element={<ProtectedRoute><Mentors /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
