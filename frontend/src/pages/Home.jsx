import React, { useState, useEffect } from 'react';
import RepositoryList from '../components/RepositoryList'; // Assuming this component is styled
import RepositoryService from '../services/repository.service';

// A simple loading spinner component
const Spinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
  </div>
);

// A component to display errors
const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
    <strong className="font-bold">Oops! </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const Home = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    RepositoryService.getAllRepositories()
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((err) => {
        // Handle potential errors gracefully
        const errorMessage = err.response?.data?.message || 'Failed to fetch repositories.';
        setError(errorMessage);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            Welcome to <span className="text-blue-600">RepoSocial</span>
          </h1>
          <p className="text-lg text-gray-500">
            Discover and connect with amazing projects from around the world.
          </p>
        </header>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-4">
            Featured Repositories
          </h2>

          {loading && <Spinner />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && <RepositoryList repositories={repositories} />}
        </div>
      </main>
    </div>
  );
};

export default Home;