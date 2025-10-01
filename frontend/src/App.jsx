import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadRepository from './pages/UploadRepository';
import Feed from './pages/Feed';
import Trending from './pages/Trending';
import Search from './pages/Search';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import Profile from './pages/Profile';

import Repository from './pages/Repository';

import Recommendations from './pages/Recommendations';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/repository/:id" element={<Repository />} />
        <Route path="/upload" element={<UploadRepository />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </Router>
  );
}

export default App;