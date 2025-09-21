
import React, { useState, useEffect } from 'react';
import RecommendationService from '../services/recommendation.service';
import RepositoryList from '../components/RepositoryList';

const Recommendations = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    RecommendationService.getRecommendations().then(
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
      <h2 className="text-2xl font-bold mb-5">Recommended for you</h2>
      <RepositoryList repositories={repositories} />
    </div>
  );
};

export default Recommendations;
