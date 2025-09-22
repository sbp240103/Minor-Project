
import React, { useState, useEffect } from 'react';
import recommendationService from '../services/recommendation.service';
import RepositoryList from '../components/RepositoryList';

const Recommendations = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    recommendationService.getRecommendations().then((res) => {
      setRepositories(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12">
      <div className="container mx-auto max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-3 mr-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Recommended for You</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          repositories.length > 0 ? (
            <RepositoryList repositories={repositories} />
          ) : (
            <div className="text-center text-gray-400 text-lg py-12">No recommendations found.</div>
          )
        )}
      </div>
    </div>
  );
};

export default Recommendations;
