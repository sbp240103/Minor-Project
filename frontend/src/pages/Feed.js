
import React, { useState, useEffect } from 'react';
import FeedService from '../services/feed.service';
import RepositoryList from '../components/RepositoryList';

const Feed = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    FeedService.getFeed().then(
      (response) => {
        setRepositories(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Feed</h2>
      <RepositoryList repositories={repositories} />
    </div>
  );
};

export default Feed;
