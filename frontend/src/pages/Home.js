
import React, { useState, useEffect } from 'react';
import RepositoryList from '../components/RepositoryList';
import RepositoryService from '../services/repository.service';

const Home = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    RepositoryService.getAllRepositories().then(
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
      <h2 className="text-2xl font-bold">Welcome to RepoSocial</h2>
      <RepositoryList repositories={repositories} />
    </div>
  );
};

export default Home;
