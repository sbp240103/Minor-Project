
import React, { useState } from 'react';
import SearchService from '../services/search.service';
import RepositoryList from '../components/RepositoryList';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await SearchService.search(query);
      setResults(response.data);
    } catch (error) {
      setError(error?.response?.data?.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-4 shadow-lg mr-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Search</h2>
          </div>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search repositories..."
                required
              />
              <button
                type="submit"
                className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-r font-bold shadow-lg transition-transform transform hover:scale-105 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                    Searching...
                  </span>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
          {error && <div className="text-red-600 bg-red-100 border-l-4 border-red-500 p-3 rounded mt-6">{error}</div>}
        </div>
        <div className="mt-10">
          <RepositoryList repositories={results} />
        </div>
      </div>
    </div>
  );
};

export default Search;
