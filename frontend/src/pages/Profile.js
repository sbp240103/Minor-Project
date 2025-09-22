
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

const Profile = () => {
  let { id } = useParams();
  if (!id) {
    id = AuthService.getCurrentUser().user.id;
  }
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const fetchUserAndRepos = async () => {
      try {
        const userRes = await UserService.getUser(id);
        const userData = userRes.data;
        // Fetch repositories for this user from new backend route
        const repoRes = await fetch(`http://localhost:5000/users/${userData._id}/repositories`);
        const repos = await repoRes.json();
        setUser({ ...userData, repositories: repos });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAndRepos();
  }, [id]);

  const handleFollow = () => {
    UserService.follow(id).then(() => {
      window.location.reload();
    });
  };

  const handleUnfollow = () => {
    UserService.unfollow(id).then(() => {
      window.location.reload();
    });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isFollowing = user.followers.some((follower) => follower._id === currentUser.user.id);

  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 shadow">
            <span className="text-4xl font-bold text-blue-500">{user.username.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{user.username}</h2>
          <p className="text-gray-500 mb-2">{user.email}</p>
          {currentUser.user.id !== user._id && (
            <div className="mt-2">
              {isFollowing ? (
                <button
                  onClick={handleUnfollow}
                  className="bg-red-500 hover:bg-red-600 transition text-white py-2 px-6 rounded-full font-semibold shadow"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="bg-blue-500 hover:bg-blue-600 transition text-white py-2 px-6 rounded-full font-semibold shadow"
                >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-6">
          <div className="text-center">
            <span className="block text-xl font-bold text-gray-700">{user.followers.length}</span>
            <span className="text-gray-500">Followers</span>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {user.followers.map(f => (
                <span key={f._id} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{f.username || f.email}</span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold text-gray-700">{user.following.length}</span>
            <span className="text-gray-500">Following</span>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {user.following.map(f => (
                <span key={f._id} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">{f.username || f.email}</span>
              ))}
            </div>
          </div>
        </div>
        {/* User's repositories section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Repositories</h3>
          <div className="grid gap-3">
            {user.repositories && user.repositories.length > 0 ? (
              user.repositories.map((repo) => (
                <div key={repo._id} className="bg-gray-100 rounded p-3 shadow-sm hover:shadow-md transition">
                  <div className="font-semibold text-blue-700">{repo.name}</div>
                  <div className="text-gray-600 text-sm">{repo.description}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No repositories yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
