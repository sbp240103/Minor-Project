
import React, { useState, useEffect } from 'react';
import RepositoryService from '../services/repository.service';
import RepositoryList from '../components/RepositoryList';

const Trending = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    RepositoryService.getTrendingRepositories().then(
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
      <h2 className="text-2xl font-bold mb-5">Trending Repositories</h2>
      <RepositoryList repositories={repositories} />
    </div>
  );
};

export default Trending;
