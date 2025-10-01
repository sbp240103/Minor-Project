import React, { useState, useEffect } from 'react';
import RepositoryService from '../services/repository.service';
import RepositoryList from '../components/RepositoryList';

// --- Reusable Feedback Components ---

// A simple loading spinner
const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="w-12 h-12 border-4 border-t-transparent border-purple-600 rounded-full animate-spin"></div>
    <p className="ml-4 text-gray-600">Fetching the latest trends...</p>
  </div>
);

// A styled error message
const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
    <p className="font-bold">An Error Occurred</p>
    <p>{message}</p>
  </div>
);

// --- Main Component ---

const Trending = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    RepositoryService.getTrendingRepositories()
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Could not load trending repositories right now.';
        setError(errorMessage);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 py-12">
      <main className="container mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-4 shadow-lg animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
            <span className="relative inline-block">
              Trending Now
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-pink-400"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Check out the projects gaining the most traction in the developer community today.
          </p>
        </header>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {loading && <Spinner />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <div className="grid gap-6">
              <RepositoryList repositories={repositories} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Trending;