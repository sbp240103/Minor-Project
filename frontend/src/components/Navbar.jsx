
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">RepoSocial</Link>
        <div className="flex space-x-4">
          <Link to="/search" className="text-white">Search</Link>
          <Link to="/trending" className="text-white">Trending</Link>
          {currentUser ? (
            <>
              <Link to="/recommendations" className="text-white">Recommendations</Link>
              <Link to="/feed" className="text-white">Feed</Link>
              <Link to={`/profile/${currentUser.user.id}`} className="text-white">{currentUser.user.username}</Link>
              <Link to="/upload" className="text-white">Upload</Link>
              <a href="/login" className="text-white" onClick={logOut}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/signup" className="text-white">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
