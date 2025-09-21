
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
    UserService.getUser(id).then(
      (response) => {
        setUser(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
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
    return <div>Loading...</div>;
  }

  const isFollowing = user.followers.some((follower) => follower._id === currentUser.user.id);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">{user.username}</h2>
        {currentUser.user.id !== user._id && (
          <div className="ml-4">
            {isFollowing ? (
              <button onClick={handleUnfollow} className="bg-red-500 text-white py-1 px-3 rounded">Unfollow</button>
            ) : (
              <button onClick={handleFollow} className="bg-blue-500 text-white py-1 px-3 rounded">Follow</button>
            )}
          </div>
        )}
      </div>
      <div className="mt-5">
        <p>{user.followers.length} Followers</p>
        <p>{user.following.length} Following</p>
      </div>
      {/* Add user's repositories here */}
    </div>
  );
};

export default Profile;
